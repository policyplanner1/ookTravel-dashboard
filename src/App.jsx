import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ScrollToTop       from '@/components/common/ScrollToTop';
import Home             from '@/pages/Home';
import Login            from '@/pages/auth/Login';
import ForgotPassword   from '@/pages/auth/ForgotPassword';
import RMSignup         from '@/pages/auth/RMSignup';
import PrivacyPolicy    from '@/pages/legal/PrivacyPolicy';
import TermsAndConditions from '@/pages/legal/TermsAndConditions';
import Support          from '@/pages/legal/Support';
import AdminLayout      from '@/layouts/AdminLayout';
import RMLayout         from '@/layouts/RMLayout';

import AdminDashboard       from '@/pages/admin/Dashboard';
import RMManagement         from '@/pages/admin/RMManagement';
import AgentManagement      from '@/pages/admin/AgentManagement';
import AdminPolicyRequests  from '@/pages/admin/PolicyRequests';
import AdminPolicies        from '@/pages/admin/Policies';
import CommissionManagement from '@/pages/admin/CommissionManagement';
import AuditLogs            from '@/pages/admin/AuditLogs';
import Reports              from '@/pages/admin/Reports';
import AdminNotifications   from '@/pages/admin/Notifications';
import SendNotification     from '@/pages/admin/SendNotification';

import RMDashboard      from '@/pages/rm/Dashboard';
import MyAgents         from '@/pages/rm/MyAgents';
import RMPolicyRequests from '@/pages/rm/PolicyRequests';
import Notifications    from '@/pages/rm/Notifications';

function RequireAuth({ children, role }) {
  const { user, token } = useSelector(s => s.auth);
  if (!token || !user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/"                     element={<Home />} />
        <Route path="/login"                element={<Login />} />
        <Route path="/forgot-password"      element={<ForgotPassword />} />
        <Route path="/rm-signup"            element={<RMSignup />} />
        <Route path="/privacy-policy"       element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/support"              element={<Support />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<RequireAuth role="admin"><AdminLayout /></RequireAuth>}>
          <Route index                  element={<AdminDashboard />} />
          <Route path="rms"             element={<RMManagement />} />
          <Route path="agents"          element={<AgentManagement />} />
          <Route path="policy-requests" element={<AdminPolicyRequests />} />
          <Route path="policies"        element={<AdminPolicies />} />
          <Route path="commissions"     element={<CommissionManagement />} />
          <Route path="reports"         element={<Reports />} />
          <Route path="audit-logs"      element={<AuditLogs />} />
          <Route path="notifications"   element={<AdminNotifications />} />
          <Route path="send-notification" element={<SendNotification />} />
        </Route>

        {/* RM Routes */}
        <Route path="/rm" element={<RequireAuth role="rm"><RMLayout /></RequireAuth>}>
          <Route index                  element={<RMDashboard />} />
          <Route path="agents"          element={<MyAgents />} />
          <Route path="policy-requests" element={<RMPolicyRequests />} />
          <Route path="notifications"   element={<Notifications />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
