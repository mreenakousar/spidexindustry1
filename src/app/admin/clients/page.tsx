"use client";

import { useEffect, useState, useMemo } from "react";
import {
  Users,
  Mail,
  Phone,
  MapPin,
  Eye,
  UserPlus,
  X,
  ShieldCheck,
  TrendingUp,
  Building2,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { PageHeader } from "@/components/ui/PageHeader";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/Button";
import { listUsersAction } from "@/actions/users";

export default function AdminClientsPage() {
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  // Modal state
  const [selectedClient, setSelectedClient] = useState<any | null>(null);

  const fetchClients = async () => {
    try {
      const res = await listUsersAction();
      // Only show client-role users
      setClients(res.filter((u: any) => u.role === "client" || u.role === "admin"));
    } catch (err) {
      console.error("Error loading clients:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  // Stats
  const stats = useMemo(() => {
    const totalClients = clients.filter((c) => c.role === "client").length;
    const totalAdmins = clients.filter((c) => c.role === "admin").length;
    const total = clients.length;
    return { totalClients, totalAdmins, total };
  }, [clients]);

  // Filters
  const filteredClients = useMemo(() => {
    return clients.filter((c) => {
      const matchSearch =
        (c.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (c.email || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (c.company || "").toLowerCase().includes(searchQuery.toLowerCase());
      const matchRole = roleFilter === "All" || c.role === roleFilter;
      return matchSearch && matchRole;
    });
  }, [clients, searchQuery, roleFilter]);

  // Table headers
  const tableHeaders = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
    { key: "company", label: "Company" },
    { key: "country", label: "Country" },
    { key: "joined", label: "Joined" },
  ];

  // Table data mapping
  const tableData = filteredClients.map((c) => ({
    id: c.id || c.email,
    name: (
      <div className="flex items-center gap-2">
        {c.avatarUrl ? (
          <img
            src={c.avatarUrl}
            alt={c.name}
            className="h-8 w-8 rounded-full object-cover border border-slate-200 shrink-0"
          />
        ) : (
          <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
            {(c.name || "U").charAt(0).toUpperCase()}
          </div>
        )}
        <span className="font-semibold text-slate-800 text-sm">{c.name || "—"}</span>
      </div>
    ),
    email: <span className="text-xs text-slate-500 font-mono">{c.email}</span>,
    role: (
      <span
        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
          c.role === "admin"
            ? "bg-indigo-50 text-indigo-700 border border-indigo-100"
            : "bg-emerald-50 text-emerald-700 border border-emerald-100"
        }`}
      >
        {c.role === "admin" ? "Administrator" : "Client"}
      </span>
    ),
    company: <span className="text-sm text-slate-600">{c.company || "—"}</span>,
    country: <span className="text-sm text-slate-600">{c.country || "—"}</span>,
    joined: (
      <span className="text-xs text-slate-500">
        {c.createdAt ? new Date(c.createdAt).toLocaleDateString() : "—"}
      </span>
    ),
  }));

  const tableButtons = [
    {
      icon: <Eye className="h-3.5 w-3.5" />,
      text: "View Profile",
      className: "bg-slate-950 text-white hover:bg-slate-800 transition-colors",
      onClick: (row: { id: string }) => {
        const found = clients.find((c) => (c.id || c.email) === row.id);
        if (found) setSelectedClient(found);
      },
    },
  ];

  const headerActions = (
    <div className="flex flex-wrap items-center gap-3">
      <input
        type="text"
        placeholder="Search name, email, company..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-800 outline-none focus:border-sky-500"
      />
      <select
        value={roleFilter}
        onChange={(e) => setRoleFilter(e.target.value)}
        className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-800 outline-none focus:border-sky-500"
      >
        <option value="All">All Roles</option>
        <option value="client">Clients Only</option>
        <option value="admin">Admins Only</option>
      </select>
    </div>
  );

  if (loading) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center space-y-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-sky-600" />
        <p className="text-sm font-medium text-slate-500">Loading client directory...</p>
      </div>
    );
  }

  return (
    <div className="space-y-[clamp(1.5rem,3vw,2rem)]">
      {/* HEADER */}
      <PageHeader
        variant="dark"
        label="Account Management"
        title="Client Directory"
        description="View all registered client accounts, their contact details, company affiliation, and access roles."
      />

      {/* STATS */}
      <section className="grid gap-[clamp(1rem,2vw,1.5rem)] sm:grid-cols-3">
        <Card variant="primary" className="p-5 flex flex-col justify-between">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-300">Total Accounts</p>
          <p className="text-2xl font-bold mt-2 text-white">{stats.total} Users</p>
        </Card>
        <Card variant="primary" className="p-5 flex flex-col justify-between">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-300">Active Clients</p>
          <p className="text-2xl font-bold mt-2 text-white">{stats.totalClients} Clients</p>
        </Card>
        <Card variant="primary" className="p-5 flex flex-col justify-between">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-300">Admin Staff</p>
          <p className="text-2xl font-bold mt-2 text-white">{stats.totalAdmins} Admins</p>
        </Card>
      </section>

      {/* TABLE */}
      <Card className="border border-slate-100 p-0 overflow-hidden bg-white">
        <DataTable
          heading="Registered Accounts"
          TableHeaders={tableHeaders}
          TableData={tableData}
          TableButtons={tableButtons}
          currentPage={1}
          totalPages={1}
          onPageChange={() => {}}
          pageSize={filteredClients.length || 10}
          totalEntries={filteredClients.length}
          headerActions={headerActions}
        />
      </Card>

      {/* DETAIL MODAL */}
      <Modal
        isOpen={selectedClient !== null}
        onClose={() => setSelectedClient(null)}
        showHeader={false}
        className="w-full max-w-md overflow-hidden bg-white"
      >
        {selectedClient && (
          <>
            <div className="flex items-center justify-between bg-slate-900 p-4">
              <div className="flex items-center gap-2">
                <Users className="text-white h-5 w-5" />
                <span className="font-medium text-white text-sm">Account Profile</span>
              </div>
              <button
                onClick={() => setSelectedClient(null)}
                className="text-white/85 hover:text-white transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Avatar + name */}
              <div className="flex items-center gap-4 rounded-xl bg-slate-50 border border-slate-100 p-4">
                {selectedClient.avatarUrl ? (
                  <img
                    src={selectedClient.avatarUrl}
                    alt={selectedClient.name}
                    className="h-14 w-14 rounded-full object-cover border border-slate-200 shrink-0"
                  />
                ) : (
                  <div className="h-14 w-14 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-500 flex items-center justify-center text-white text-xl font-bold shrink-0">
                    {(selectedClient.name || "U").charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <p className="font-bold text-slate-900 text-base">{selectedClient.name || "—"}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{selectedClient.email}</p>
                  <span
                    className={`mt-1.5 inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      selectedClient.role === "admin"
                        ? "bg-indigo-100 text-indigo-700"
                        : "bg-emerald-100 text-emerald-700"
                    }`}
                  >
                    {selectedClient.role === "admin" ? "Administrator" : "Client"}
                  </span>
                </div>
              </div>

              {/* Contact & company info */}
              <div className="grid grid-cols-2 gap-3 rounded-xl bg-slate-50 border border-slate-100 p-4 text-xs">
                {[
                  { label: "Company", value: selectedClient.company || "—" },
                  { label: "Country", value: selectedClient.country || "—" },
                  { label: "Phone", value: selectedClient.phone || "—" },
                  { label: "Address", value: selectedClient.address || "—" },
                  {
                    label: "Account Created",
                    value: selectedClient.createdAt
                      ? new Date(selectedClient.createdAt).toLocaleDateString()
                      : "—",
                  },
                ].map(({ label, value }) => (
                  <div key={label} className="col-span-2 sm:col-span-1 border-b border-slate-100 pb-1.5">
                    <span className="text-slate-400 block font-medium mb-0.5">{label}</span>
                    <span className="font-semibold text-slate-800 text-sm">{value}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-end pt-2">
                <Button variant="outline" onClick={() => setSelectedClient(null)}>
                  Close
                </Button>
              </div>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
}
