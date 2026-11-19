"use client";

import { useMemo, useState, type FormEvent } from "react";
import {
  Eye,
  EyeOff,
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  UserRound,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import {
  createId,
  getGrades,
  getStudents,
  getSubjects,
  getUsers,
  initializeStorage,
  saveGrades,
  saveStudents,
  saveUsers,
} from "@/services/storage";
import type { Student, User } from "@/types";

const empty = {
  name: "",
  username: "",
  password: "",
  registration: "",
  email: "",
  subjectIds: [] as string[],
};

export default function StudentsPage() {
  initializeStorage();
  const [students, setStudents] = useState<Student[]>(() => getStudents());
  const [users, setUsers] = useState<User[]>(() => getUsers());
  const [subjectIds] = useState<string[]>(() =>
    getSubjects().map((subject) => subject.id)
  );
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Student | null>(null);
  const [form, setForm] = useState(empty);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [visiblePasswords, setVisiblePasswords] = useState<Set<string>>(
    () => new Set()
  );

  const filtered = useMemo(
    () =>
      students.filter((student) =>
        `${student.name} ${student.username} ${student.registration}`
          .toLowerCase()
          .includes(search.toLowerCase())
      ),
    [students, search]
  );

  const openCreate = () => {
    setEditing(null);
    setForm({ ...empty, subjectIds });
    setError("");
    setShowPassword(false);
    setOpen(true);
  };

  const openEdit = (student: Student) => {
    setEditing(student);
    setForm({
      name: student.name,
      username: student.username,
      password: student.password,
      registration: student.registration,
      email: student.email,
      subjectIds: student.subjectIds,
    });
    setError("");
    setShowPassword(false);
    setOpen(true);
  };

  const toggleStudentPassword = (studentId: string) => {
    setVisiblePasswords((current) => {
      const next = new Set(current);
      if (next.has(studentId)) next.delete(studentId);
      else next.add(studentId);
      return next;
    });
  };

  const save = (event: FormEvent) => {
    event.preventDefault();
    setError("");
    if (
      !form.name.trim() ||
      !form.username.trim() ||
      !form.password.trim() ||
      !form.registration.trim()
    ) {
      setError("Preencha nome, usuário, senha e matrícula.");
      return;
    }
    if (
      students.some(
        (student) =>
          student.username.toLowerCase() === form.username.trim().toLowerCase() &&
          student.id !== editing?.id
      )
    ) {
      setError("Este usuário já está cadastrado.");
      return;
    }

    let nextStudents: Student[];
    let nextUsers = [...users];
    if (editing) {
      const updated: Student = {
        ...editing,
        name: form.name.trim(),
        username: form.username.trim(),
        password: form.password,
        registration: form.registration.trim(),
        email: form.email.trim(),
        subjectIds: form.subjectIds,
      };
      nextStudents = students.map((student) =>
        student.id === editing.id ? updated : student
      );
      nextUsers = nextUsers.map((user) =>
        user.studentId === editing.id
          ? { ...user, name: updated.name, username: updated.username, password: updated.password }
          : user
      );
    } else {
      const student: Student = {
        id: createId("student"),
        name: form.name.trim(),
        username: form.username.trim(),
        password: form.password,
        registration: form.registration.trim(),
        email: form.email.trim(),
        subjectIds: form.subjectIds,
      };
      nextStudents = [...students, student];
      nextUsers = [
        ...nextUsers,
        {
          id: createId("user"),
          name: student.name,
          username: student.username,
          password: student.password,
          role: "aluno",
          studentId: student.id,
        },
      ];
    }
    saveStudents(nextStudents);
    saveUsers(nextUsers);
    setStudents(nextStudents);
    setUsers(nextUsers);
    setOpen(false);
  };

  const remove = (student: Student) => {
    if (
      !window.confirm(
        `Excluir o aluno ${student.name}? Esta ação também removerá suas notas.`
      )
    )
      return;
    const nextStudents = students.filter((item) => item.id !== student.id);
    const nextUsers = users.filter((item) => item.studentId !== student.id);
    saveStudents(nextStudents);
    saveUsers(nextUsers);
    saveGrades(getGrades().filter((grade) => grade.studentId !== student.id));
    setStudents(nextStudents);
    setUsers(nextUsers);
  };

  return (
    <AppShell title="Alunos" subtitle="Cadastro e informações acadêmicas">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold">Alunos</h1>
          <p className="mt-1 text-sm text-slate-500">
            Gerencie os estudantes cadastrados
          </p>
        </div>
        <button
          onClick={openCreate}
          className="flex h-11 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 text-sm font-semibold text-white shadow-lg shadow-indigo-500/15 hover:bg-indigo-700"
        >
          <Plus size={18} />
          Novo aluno
        </button>
      </div>
      <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="border-b border-slate-100 p-4 dark:border-slate-800">
          <div className="relative max-w-md">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={17}
            />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar por nome, usuário ou matrícula"
              className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-950"
            />
          </div>
        </div>
        {filtered.length === 0 ? (
          <div className="py-16 text-center">
            <UserRound className="mx-auto text-slate-300" />
            <p className="mt-3 text-sm text-slate-500">Nenhum aluno encontrado.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs text-slate-500 dark:bg-slate-950/40">
                <tr>
                  <th className="px-5 py-3">Aluno</th>
                  <th className="px-5 py-3">Matrícula</th>
                  <th className="px-5 py-3">Usuário</th>
                  <th className="px-5 py-3">Senha</th>
                  <th className="px-5 py-3 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filtered.map((student) => (
                  <tr key={student.id}>
                    <td className="px-5 py-4">
                      <p className="font-semibold">{student.name}</p>
                      <p className="text-xs text-slate-500">
                        {student.email || "Sem e-mail"}
                      </p>
                    </td>
                    <td className="px-5 py-4">{student.registration}</td>
                    <td className="px-5 py-4">{student.username}</td>
                    <td className="px-5 py-4 font-mono text-xs">
                      <div className="flex items-center gap-2">
                        <span>
                          {visiblePasswords.has(student.id)
                            ? student.password
                            : "••••••••"}
                        </span>
                        <button
                          type="button"
                          onClick={() => toggleStudentPassword(student.id)}
                          aria-label={
                            visiblePasswords.has(student.id)
                              ? `Ocultar senha de ${student.name}`
                              : `Mostrar senha de ${student.name}`
                          }
                          className="rounded-md p-1 text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
                        >
                          {visiblePasswords.has(student.id) ? (
                            <EyeOff size={16} />
                          ) : (
                            <Eye size={16} />
                          )}
                        </button>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-1">
                        <button
                          aria-label="Editar"
                          onClick={() => openEdit(student)}
                          className="rounded-lg p-2 text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-500/10"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          aria-label="Excluir"
                          onClick={() => remove(student)}
                          className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/50 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white shadow-2xl dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-800">
              <h2 className="font-semibold">
                {editing ? "Editar aluno" : "Cadastrar aluno"}
              </h2>
              <button
                onClick={() => setOpen(false)}
                className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X size={18} />
              </button>
            </div>
            <form onSubmit={save} className="space-y-4 p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-sm font-medium">
                  Nome completo
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-3 dark:border-slate-700 dark:bg-slate-950"
                  />
                </label>
                <label className="text-sm font-medium">
                  Matrícula
                  <input
                    value={form.registration}
                    onChange={(e) =>
                      setForm({ ...form, registration: e.target.value })
                    }
                    className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-3 dark:border-slate-700 dark:bg-slate-950"
                  />
                </label>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-sm font-medium">
                  Usuário
                  <input
                    value={form.username}
                    onChange={(e) =>
                      setForm({ ...form, username: e.target.value })
                    }
                    className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-3 dark:border-slate-700 dark:bg-slate-950"
                  />
                </label>
                <div className="text-sm font-medium">
                  <label htmlFor="student-password">Senha</label>
                  <div className="relative mt-2">
                  <input
                    id="student-password"
                    value={form.password}
                    type={showPassword ? "text" : "password"}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    className="h-11 w-full rounded-xl border border-slate-200 px-3 pr-11 dark:border-slate-700 dark:bg-slate-950"
                  />
                    <button
                      type="button"
                      onClick={() => setShowPassword((visible) => !visible)}
                      aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              </div>
              <label className="block text-sm font-medium">
                E-mail
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-3 dark:border-slate-700 dark:bg-slate-950"
                />
              </label>
              {error && (
                <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950/40">
                  {error}
                </p>
              )}
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="h-11 rounded-xl border border-slate-200 px-4 text-sm font-semibold dark:border-slate-700"
                >
                  Cancelar
                </button>
                <button className="h-11 rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white hover:bg-indigo-700">
                  {editing ? "Salvar alterações" : "Cadastrar aluno"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AppShell>
  );
}
