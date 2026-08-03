import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Send, Search, User, Users, Megaphone, ShieldCheck, Wallet, Bell } from 'lucide-react';
import { notificationsApi } from '@/api/notifications.api';
import { agentsApi } from '@/api/agents.api';
import { rmsApi } from '@/api/rms.api';
import PageHeader from '@/components/common/PageHeader';
import DataTable from '@/components/common/DataTable';
import Badge from '@/components/common/Badge';
import ConfirmModal from '@/components/common/ConfirmModal';
import { formatDateTime, capitalize } from '@/utils/helpers';

const CATEGORIES = [
  { value: 'marketing',        label: 'Marketing',        icon: Megaphone },
  { value: 'kyc_update',       label: 'KYC Update',       icon: ShieldCheck },
  { value: 'commission_paid',  label: 'Commission Paid',  icon: Wallet },
  { value: 'general',          label: 'General',          icon: Bell },
];

const categoryColor = { marketing: 'purple', kyc_update: 'blue', commission_paid: 'green', general: 'gray' };

const initialForm = { title: '', message: '', category: 'general', target_type: 'all', target_value: '' };

export default function SendNotification() {
  const qc = useQueryClient();
  const [form, setForm] = useState(initialForm);
  const [agentSearch, setAgentSearch] = useState('');
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [result, setResult] = useState(null);

  const { data: rmsData } = useQuery({
    queryKey: ['rms-list'],
    queryFn:  () => rmsApi.getAll({ status: 'active', limit: 100 }),
    enabled:  form.target_type === 'rm',
  });
  const rmList = rmsData?.data?.data || [];

  const { data: agentResults } = useQuery({
    queryKey: ['agent-search', agentSearch],
    queryFn:  () => agentsApi.getAll({ search: agentSearch, limit: 10 }),
    enabled:  form.target_type === 'single' && agentSearch.trim().length >= 2,
  });
  const agentMatches = agentResults?.data?.data || [];

  const { data: historyData, isLoading: historyLoading } = useQuery({
    queryKey: ['notifications-sent', page],
    queryFn:  () => notificationsApi.sentHistory({ page, limit: 10 }),
  });
  const history    = historyData?.data?.data || [];
  const pagination = historyData?.data?.pagination;

  const sendMut = useMutation({
    mutationFn: () => notificationsApi.send(form),
    onSuccess: (res) => {
      setResult(res.data.data);
      setForm(initialForm);
      setSelectedAgent(null);
      setAgentSearch('');
      qc.invalidateQueries(['notifications-sent']);
      setConfirmOpen(false);
    },
    onError: () => setConfirmOpen(false),
  });

  const targetLabel = () => {
    switch (form.target_type) {
      case 'all':        return 'All active agents';
      case 'status':     return form.target_value ? `Agents with status: ${capitalize(form.target_value)}` : null;
      case 'kyc_status': return form.target_value ? `Agents with KYC: ${capitalize(form.target_value)}` : null;
      case 'rm':         return form.target_value ? `Agents under: ${rmList.find(r => String(r.id) === String(form.target_value))?.full_name || '—'}` : null;
      case 'single':     return selectedAgent ? `${selectedAgent.full_name} (${selectedAgent.email})` : null;
      default:           return null;
    }
  };

  const canSend = form.title.trim().length >= 2 && form.message.trim().length >= 2 &&
    (form.target_type === 'all' || !!form.target_value);

  const historyColumns = [
    { key: 'title', label: 'Title', render: (v, r) => (
      <div>
        <p className="font-medium text-gray-900">{v}</p>
        <p className="text-xs text-gray-400 max-w-xs truncate">{r.message}</p>
      </div>
    ) },
    { key: 'category', label: 'Category', render: v => <Badge status={v} color={categoryColor[v] || 'gray'} label={capitalize(v)} /> },
    { key: 'target_type', label: 'Target', render: (v, r) => (
      <span className="text-xs text-gray-600">
        {v === 'all' ? 'All agents' : v === 'single' ? 'Single agent' : `${capitalize(v)}: ${r.target_meta ?? '—'}`}
      </span>
    ) },
    { key: 'recipient_count', label: 'Recipients' },
    { key: 'push_sent_count', label: 'Push Sent' },
    { key: 'sent_by_name', label: 'Sent By', render: v => v || '—' },
    { key: 'created_at', label: 'Sent At', render: v => formatDateTime(v) },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Send Notification" subtitle="Notify agents about marketing, KYC updates, commissions, or general announcements" />

      <div className="card p-5 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="form-label">Title</label>
            <input className="form-input" maxLength={200} value={form.title}
              onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              placeholder="e.g. Diwali Bonus Offer" />
          </div>
          <div>
            <label className="form-label">Category</label>
            <select className="form-select" value={form.category}
              onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
              {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="form-label">Message</label>
          <textarea className="form-input" rows={3} value={form.message}
            onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
            placeholder="Write the notification message agents will see..." />
        </div>

        <div>
          <label className="form-label">Recipients</label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {[
              { value: 'all',        label: 'All Agents',  icon: Users },
              { value: 'status',     label: 'By Status',   icon: User },
              { value: 'kyc_status', label: 'By KYC',       icon: ShieldCheck },
              { value: 'rm',         label: 'By RM',        icon: Users },
              { value: 'single',     label: 'One Agent',    icon: User },
            ].map(({ value, label, icon: Icon }) => (
              <button key={value} type="button"
                onClick={() => { setForm(f => ({ ...f, target_type: value, target_value: '' })); setSelectedAgent(null); setAgentSearch(''); }}
                className={`flex flex-col items-center gap-1 py-2.5 rounded-xl border text-xs font-medium transition-colors ${
                  form.target_type === value
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                }`}>
                <Icon size={16} />
                {label}
              </button>
            ))}
          </div>

          <div className="mt-3">
            {form.target_type === 'status' && (
              <select className="form-select" value={form.target_value}
                onChange={e => setForm(f => ({ ...f, target_value: e.target.value }))}>
                <option value="">-- Choose status --</option>
                <option value="pending">Pending</option>
                <option value="active">Active</option>
                <option value="suspended">Suspended</option>
              </select>
            )}

            {form.target_type === 'kyc_status' && (
              <select className="form-select" value={form.target_value}
                onChange={e => setForm(f => ({ ...f, target_value: e.target.value }))}>
                <option value="">-- Choose KYC status --</option>
                <option value="pending">Pending</option>
                <option value="verified">Verified</option>
                <option value="rejected">Rejected</option>
              </select>
            )}

            {form.target_type === 'rm' && (
              <select className="form-select" value={form.target_value}
                onChange={e => setForm(f => ({ ...f, target_value: e.target.value }))}>
                <option value="">-- Choose RM --</option>
                {rmList.map(rm => <option key={rm.id} value={rm.id}>{rm.full_name} ({rm.agent_count} agents)</option>)}
              </select>
            )}

            {form.target_type === 'single' && (
              <div className="relative">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input className="form-input pl-9" placeholder="Search agent by name, email, or mobile..."
                  value={selectedAgent ? `${selectedAgent.full_name} (${selectedAgent.email})` : agentSearch}
                  onChange={e => { setSelectedAgent(null); setForm(f => ({ ...f, target_value: '' })); setAgentSearch(e.target.value); }} />
                {!selectedAgent && agentSearch.trim().length >= 2 && agentMatches.length > 0 && (
                  <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-56 overflow-y-auto">
                    {agentMatches.map(a => (
                      <button key={a.id} type="button"
                        onClick={() => { setSelectedAgent(a); setForm(f => ({ ...f, target_value: a.id })); }}
                        className="w-full text-left px-4 py-2.5 hover:bg-gray-50 text-sm border-b border-gray-50 last:border-0">
                        <p className="font-medium text-gray-800">{a.full_name}</p>
                        <p className="text-xs text-gray-400">{a.email} · {a.mobile}</p>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {targetLabel() && (
            <p className="text-xs text-blue-600 mt-2 font-medium">Target: {targetLabel()}</p>
          )}
        </div>

        {result && (
          <div className="bg-green-50 border border-green-100 rounded-xl p-3 text-sm text-green-700">
            Sent to {result.recipientCount} agent{result.recipientCount === 1 ? '' : 's'} —
            {' '}{result.pushSent} push notification{result.pushSent === 1 ? '' : 's'} delivered
            {result.pushFailed > 0 && `, ${result.pushFailed} failed (no active device)`}.
          </div>
        )}

        <div className="flex justify-end">
          <button type="button" disabled={!canSend} onClick={() => setConfirmOpen(true)}
            className="btn-primary flex items-center gap-2">
            <Send size={15} /> Send Notification
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-sm font-semibold text-gray-700 mb-3">Recent Sends</h2>
        <DataTable columns={historyColumns} data={history} loading={historyLoading}
          pagination={{ ...pagination, page }} onPageChange={setPage} emptyMessage="No notifications sent yet" />
      </div>

      <ConfirmModal isOpen={confirmOpen} onClose={() => setConfirmOpen(false)} title="Send Notification"
        message={`This will send "${form.title}" to ${targetLabel() || 'the selected recipients'}. Continue?`}
        onConfirm={() => sendMut.mutate()} confirmLabel="Send" loading={sendMut.isPending} />
    </div>
  );
}
