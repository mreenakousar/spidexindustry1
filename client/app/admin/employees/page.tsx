"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Award,
  Mail,
  Search,
  ShieldCheck,
  Users,
  Watch,
  X,
} from "lucide-react";

interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  location: string;
  shift: string;
  performance: number;
  status: "Active" | "On Leave" | "Training";
  email: string;
  phone: string;
  recentLogins: string[];
}

const employeeData: Employee[] = [
  {
    id: "EMP-1021",
    name: "Sara Kim",
    role: "Production Manager",
    department: "Cut & Sew",
    location: "Dhaka Facility",
    shift: "Morning",
    performance: 92,
    status: "Active",
    email: "sara.kim@speedxindustry.com",
    phone: "+880 1712 345678",
    recentLogins: [
      "Reviewed line output",
      "Approved color approval",
      "Updated daily target",
    ],
  },
  {
    id: "EMP-1083",
    name: "Jamal Khan",
    role: "Quality Inspector",
    department: "QC",
    location: "Dhaka Facility",
    shift: "Evening",
    performance: 88,
    status: "Active",
    email: "jamal.khan@speedxindustry.com",
    phone: "+880 1718 765432",
    recentLogins: [
      "Finished inspection batch #47",
      "Logged fabric defect report",
      "Updated QC checklist",
    ],
  },
  {
    id: "EMP-1154",
    name: "Nina Roberts",
    role: "Supply Planner",
    department: "Procurement",
    location: "London Office",
    shift: "Day",
    performance: 94,
    status: "On Leave",
    email: "nina.roberts@speedxindustry.com",
    phone: "+44 20 7946 0877",
    recentLogins: [
      "Reviewed fabric lead times",
      "Assigned purchase orders",
      "Completed vendor evaluation",
    ],
  },
];

function badgeClass(status: Employee["status"]) {
  switch (status) {
    case "Active":
      return "bg-emerald-100 text-emerald-700";
    case "On Leave":
      return "bg-sky-100 text-sky-700";
    default:
      return "bg-amber-100 text-amber-700";
  }
}

function Modal({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-950/50 px-4 py-8">
      <div className="w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-slate-900">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-700">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Employee profile
          </h2>
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="max-h-[80vh] overflow-y-auto p-6">{children}</div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <p className="text-sm font-semibold text-slate-900 dark:text-white">
        No employees found.
      </p>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        Adjust the search criteria or add new team members.
      </p>
    </div>
  );
}

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [search, setSearch] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setEmployees(employeeData);
      setIsLoading(false);
    }, 600);
    return () => window.clearTimeout(timer);
  }, []);

  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const query = search.toLowerCase();
      return (
        employee.name.toLowerCase().includes(query) ||
        employee.role.toLowerCase().includes(query) ||
        employee.department.toLowerCase().includes(query)
      );
    });
  }, [employees, search]);

  const stats = useMemo(() => {
    return {
      total: employees.length,
      production: employees.filter(
        (employee) => employee.department === "Cut & Sew",
      ).length,
      qc: employees.filter((employee) => employee.department === "QC").length,
      procurement: employees.filter(
        (employee) => employee.department === "Procurement",
      ).length,
    };
  }, [employees]);

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Total Employees
          </p>
          <p className="mt-4 text-4xl font-semibold text-slate-900 dark:text-white">
            {stats.total}
          </p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Production Team
          </p>
          <p className="mt-4 text-4xl font-semibold text-sky-600">
            {stats.production}
          </p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            QC Inspectors
          </p>
          <p className="mt-4 text-4xl font-semibold text-emerald-600">
            {stats.qc}
          </p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Procurement
          </p>
          <p className="mt-4 text-4xl font-semibold text-amber-600">
            {stats.procurement}
          </p>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
              Employee Management
            </h1>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Track employee assignments, performance, and availability across
              manufacturing teams.
            </p>
          </div>
          <div className="relative max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search employees"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            />
          </div>
        </div>

        <div className="mt-6 overflow-x-auto">
          {isLoading ? (
            <div className="space-y-4 py-6">
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="h-16 rounded-3xl bg-slate-100 dark:bg-slate-800"
                ></div>
              ))}
            </div>
          ) : filteredEmployees.length === 0 ? (
            <EmptyState />
          ) : (
            <table className="min-w-full divide-y divide-slate-200 text-sm dark:divide-slate-700">
              <thead className="bg-slate-50 text-slate-700 dark:bg-slate-950 dark:text-slate-200">
                <tr>
                  <th className="px-5 py-4 text-left">Name</th>
                  <th className="px-5 py-4 text-left">Role</th>
                  <th className="px-5 py-4 text-left">Department</th>
                  <th className="px-5 py-4 text-left">Shift</th>
                  <th className="px-5 py-4 text-left">Performance</th>
                  <th className="px-5 py-4 text-left">Status</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {filteredEmployees.map((employee) => (
                  <tr
                    key={employee.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    <td className="px-5 py-4 text-slate-900 dark:text-white">
                      {employee.name}
                    </td>
                    <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                      {employee.role}
                    </td>
                    <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                      {employee.department}
                    </td>
                    <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                      {employee.shift}
                    </td>
                    <td className="px-5 py-4">
                      <div className="h-2.5 w-28 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                        {/* eslint-disable-next-line */}
                        <div
                          className="h-full rounded-full bg-emerald-500"
                          style={{ width: `${employee.performance}%` }}
                        ></div>
                      </div>
                      <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                        {employee.performance}%
                      </p>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${badgeClass(employee.status)}`}
                      >
                        {employee.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
                        onClick={() => setSelectedEmployee(employee)}
                      >
                        View Profile
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <Modal
        open={!!selectedEmployee}
        onClose={() => setSelectedEmployee(null)}
      >
        {selectedEmployee && (
          <div className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-950">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      {selectedEmployee.role}
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
                      {selectedEmployee.name}
                    </h3>
                  </div>
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${badgeClass(selectedEmployee.status)}`}
                  >
                    {selectedEmployee.status}
                  </span>
                </div>
                <div className="mt-6 space-y-4 text-sm text-slate-600 dark:text-slate-300">
                  <p>
                    <Mail className="inline-block h-4 w-4 text-slate-400" />{" "}
                    <span className="ml-2">{selectedEmployee.email}</span>
                  </p>
                  <p>
                    <Watch className="inline-block h-4 w-4 text-slate-400" />{" "}
                    <span className="ml-2">{selectedEmployee.shift}</span>
                  </p>
                  <p>
                    <ShieldCheck className="inline-block h-4 w-4 text-slate-400" />{" "}
                    <span className="ml-2">{selectedEmployee.department}</span>
                  </p>
                </div>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-950">
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Performance Score
                </p>
                <p className="mt-3 text-4xl font-semibold text-emerald-600 dark:text-emerald-400">
                  {selectedEmployee.performance}%
                </p>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  Current productivity rating based on line output and quality
                  checks.
                </p>
              </div>
            </div>
            <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-950">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Recent Activity
              </p>
              <ul className="mt-4 space-y-3 text-sm text-slate-700 dark:text-slate-300">
                {selectedEmployee.recentLogins.map((item) => (
                  <li
                    key={item}
                    className="rounded-3xl bg-white p-4 shadow-sm dark:bg-slate-900"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        )}
      </Modal>
    </div>
  );
}
