import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { TrendingUp, Shield, DollarSign, Clock, UserPlus, Users, Download, Loader2 } from 'lucide-react';
import { reportsApi } from '@/api/reports.api';
import StatCard       from '@/components/common/StatCard';
import DataTable      from '@/components/common/DataTable';
import Badge          from '@/components/common/Badge';
import PageHeader     from '@/components/common/PageHeader';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { formatCurrency, getStatusColor } from '@/utils/helpers';

const PERIODS = [
  { value: 'this_month',   label: 'This Month' },
  { value: 'last_month',   label: 'Last Month' },
  { value: 'this_quarter', label: 'This Quarter' },
  { value: 'this_year',    label: 'This Year' },
];

function GrowthBadge({ value }) {
  const v = Number(value || 0);
  return (
    <span className={`text-xs font-semibold ${v >= 0 ? 'text-green-600' : 'text-red-600'}`}>
      {v > 0 ? '+' : ''}{v.toFixed(1)}%
    </span>
  );
}

export default function Reports() {
  const [period, setPeriod] = useState('this_month');
  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['performance-report', period],
    queryFn:  () => reportsApi.getPerformance(period),
  });

  const summary = data?.data?.data?.summary || {};
  const rms     = data?.data?.data?.rm_performance || [];
  const agents  = data?.data?.data?.agent_performance || [];

  const handleDownload = async () => {
    setDownloading(true);
    setDownloadError('');
    try {
      const res = await reportsApi.downloadPdf(period);
      const url = window.URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.download = `performance-report-${period}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch {
      setDownloadError('Could not generate the PDF. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  const rmColumns = [
    { key: 'rank',            label: '#' },
    { key: 'full_name',       label: 'RM Name' },
    { key: 'agent_count',     label: 'Agents' },
    { key: 'policies_issued', label: 'Policies' },
    { key: 'revenue',         label: 'Revenue',       render: v => formatCurrency(v) },
    { key: 'commission_paid', label: 'Comm. Paid',    render: v => formatCurrency(v) },
    { key: 'commission_pending', label: 'Comm. Pending', render: v => formatCurrency(v) },
    { key: 'growth_pct',      label: 'Growth',        render: v => <GrowthBadge value={v} /> },
    { key: 'status',          label: 'Status',        render: v => <Badge status={v} color={getStatusColor(v)} /> },
  ];

  const agentColumns = [
    { key: 'rank',            label: '#' },
    { key: 'full_name',       label: 'Agent Name' },
    { key: 'rm_name',         label: 'RM' },
    { key: 'policies_issued', label: 'Policies' },
    { key: 'revenue',         label: 'Revenue',       render: v => formatCurrency(v) },
    { key: 'commission_paid', label: 'Comm. Paid',    render: v => formatCurrency(v) },
    { key: 'growth_pct',      label: 'Growth',        render: v => <GrowthBadge value={v} /> },
    { key: 'kyc_status',      label: 'KYC',           render: v => <Badge status={v} color={getStatusColor(v)} /> },
    { key: 'status',          label: 'Status',        render: v => <Badge status={v} color={getStatusColor(v)} /> },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Performance Reports"
        subtitle="RM and Agent performance for business decision and growth planning"
        action={
          <div className="flex items-center gap-2">
            <select value={period} onChange={e => setPeriod(e.target.value)} className="form-input w-40">
              {PERIODS.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
            </select>
            <button onClick={handleDownload} disabled={downloading || isLoading}
              className="btn-primary flex items-center gap-2 disabled:opacity-60">
              {downloading ? <Loader2 size={15} className="animate-spin" /> : <Download size={15} />}
              Download PDF
            </button>
          </div>
        }
      />

      {downloadError && (
        <p className="text-sm text-red-600 -mt-4">{downloadError}</p>
      )}

      {isLoading ? <LoadingSpinner fullPage /> : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            <StatCard title="Total Revenue"    value={formatCurrency(summary.total_revenue)} icon={TrendingUp} color="green"  trend={summary.revenue_growth_pct} />
            <StatCard title="Policies Issued"  value={summary.total_policies} icon={Shield} color="blue" trend={summary.policies_growth_pct} />
            <StatCard title="Commission Paid"  value={formatCurrency(summary.commission_paid)} icon={DollarSign} color="purple" />
            <StatCard title="Commission Pending" value={formatCurrency(summary.commission_pending)} icon={Clock} color="yellow" />
            <StatCard title="New Agents"       value={summary.new_agents} icon={UserPlus} color="indigo" subtitle={`in ${summary.period_label?.toLowerCase() || 'period'}`} />
            <StatCard title="Active Agents"    value={`${summary.active_agents ?? 0} / ${summary.total_agents ?? 0}`} icon={Users} color="orange" />
          </div>

          <div className="card overflow-hidden">
            <div className="px-5 pt-5 pb-3">
              <h2 className="text-base font-bold text-gray-900">RM Performance</h2>
              <p className="text-xs text-gray-500 mt-0.5">Ranked by revenue for the selected period</p>
            </div>
            <div className="px-5 pb-5">
              <DataTable columns={rmColumns} data={rms} emptyMessage="No RM activity for this period" />
            </div>
          </div>

          <div className="card overflow-hidden">
            <div className="px-5 pt-5 pb-3">
              <h2 className="text-base font-bold text-gray-900">Agent Performance</h2>
              <p className="text-xs text-gray-500 mt-0.5">Ranked by revenue for the selected period</p>
            </div>
            <div className="px-5 pb-5">
              <DataTable columns={agentColumns} data={agents} emptyMessage="No agent activity for this period" />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
