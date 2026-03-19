"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Bell,
  CheckCircle2,
  Circle,
  DollarSign,
  FolderKanban,
  Search,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

// Accept prop "leadnestBranding" to swap welcome banner copy.
type Metric = {
  label: string;
  value: string;
  trend: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
};

type OnboardingStep = {
  title: string;
  description: string;
  href: string;
  done: boolean;
};

type ActivityItem = {
  title: string;
  detail: string;
  time: string;
  icon: React.ComponentType<{ className?: string }>;
};

type MockProject = {
  id: string;
  name: string;
  owner: string;
  status: string;
};

const metrics: Metric[] = [
  { label: "Total Contacts", value: "1,842", trend: "+9.3%", icon: Users, description: "in your CRM" },
  { label: "Deals in Pipeline", value: "18", trend: "+2.1%", icon: FolderKanban, description: "open opportunities" },
  { label: "Closed Deals (YTD)", value: "97", trend: "+14.2%", icon: DollarSign, description: "year to date" },
  { label: "Avg. Win Rate", value: "32%", trend: "+4.8%", icon: TrendingUp, description: "this quarter" },
];

const onboardingSteps: OnboardingStep[] = [
  { title: "Add your first contact", description: "Kick things off with a new lead or customer.", href: "/dashboard/contacts", done: false },
  { title: "Create a new deal", description: "Start tracking an active opportunity.", href: "/dashboard/deals", done: false },
  { title: "Invite your team", description: "Get others collaborating in LeadNest.", href: "/dashboard/team", done: false },
  { title: "Explore dashboard analytics", description: "See pipeline health and activity in Overview.", href: "/dashboard/overview", done: false },
];

const recentActivity: ActivityItem[] = [
  { title: "Contact added", detail: "Priya Sheth added to Contacts", time: "4 min ago", icon: Users },
  { title: "Deal created", detail: "ACME Corp - Beta Trial (Stage: Discovery)", time: "31 min ago", icon: FolderKanban },
  { title: "Win logged", detail: "Closed deal with Orange Labs", time: "2 hr ago", icon: DollarSign },
  { title: "Note added", detail: "Jake commented on SkyNet pipeline", time: "3 hr ago", icon: Activity },
  { title: "Team joined", detail: "Rahul Singh accepted invite", time: "Yesterday", icon: Users },
];

const quickActions = [
  { label: "Add Contact", href: "/dashboard/contacts", icon: Users },
  { label: "Add Deal", href: "/dashboard/deals", icon: FolderKanban },
  { label: "Overview", href: "/dashboard/overview", icon: TrendingUp },
];

const weeklyData = [
  { day: "Mon", users: 12, revenue: 500 },
  { day: "Tue", users: 21, revenue: 890 },
  { day: "Wed", users: 19, revenue: 670 },
  { day: "Thu", users: 25, revenue: 1250 },
  { day: "Fri", users: 21, revenue: 980 },
  { day: "Sat", users: 7, revenue: 510 },
  { day: "Sun", users: 8, revenue: 320 },
];

const monthlyRevenue = [
  { month: "Jan", value: 3200 },
  { month: "Feb", value: 4100 },
  { month: "Mar", value: 3900 },
  { month: "Apr", value: 4680 },
  { month: "May", value: 5840 },
  { month: "Jun", value: 5300 },
  { month: "Jul", value: 6710 },
  { month: "Aug", value: 7450 },
  { month: "Sep", value: 6590 },
  { month: "Oct", value: 8100 },
  { month: "Nov", value: 9660 },
  { month: "Dec", value: 12290 },
];

const initialMockProjects: MockProject[] = [
  { id: "p-1", name: "Lead Import", owner: "Chirag", status: "Draft" },
  { id: "p-2", name: "Pipeline Automation", owner: "Nina", status: "In Review" },
];

function BarChart({ data }: { data: typeof weeklyData }) {
  const maxUsers = Math.max(...data.map((d) => d.users));

  return (
    <div className="space-y-2">
      <div className="flex items-end gap-1.5 h-[140px]">
        {data.map((d) => {
          const height = (d.users / maxUsers) * 100;
          return (
            <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-[10px] text-muted-foreground font-medium">{d.users}</span>
              <div
                className="w-full rounded-t-md bg-primary/80 transition-all hover:bg-primary min-h-[4px]"
                style={{ height: `${height}%` }}
              />
            </div>
          );
        })}
      </div>
      <div className="flex gap-1.5">
        {data.map((d) => (
          <div key={d.day} className="flex-1 text-center text-[10px] text-muted-foreground">
            {d.day}
          </div>
        ))}
      </div>
    </div>
  );
}

function AreaChart({ data }: { data: typeof monthlyRevenue }) {
  const maxVal = Math.max(...data.map((d) => d.value));
  const minVal = Math.min(...data.map((d) => d.value)) * 0.8;
  const range = maxVal - minVal;
  const w = 400;
  const h = 140;
  const padding = 4;

  const points = data.map((d, i) => ({
    x: padding + (i / (data.length - 1)) * (w - padding * 2),
    y: h - padding - ((d.value - minVal) / range) * (h - padding * 2),
  }));

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${h} L ${points[0].x} ${h} Z`;

  return (
    <div className="space-y-2">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-[140px]" preserveAspectRatio="none">
        <defs>
          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <path d={areaPath} fill="url(#areaGradient)" />
        <path d={linePath} fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinejoin="round" />
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="3" fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeWidth="1.5" />
        ))}
      </svg>
      <div className="flex justify-between px-1">
        {data.filter((_, i) => i % 2 === 0).map((d) => (
          <span key={d.month} className="text-[10px] text-muted-foreground">{d.month}</span>
        ))}
      </div>
    </div>
  );
}

function matchesQuery(query: string, ...fields: string[]): boolean {
  const q = query.toLowerCase();
  return fields.some((f) => f.toLowerCase().includes(q));
}

export function DashboardContent({
  greeting,
  firstName,
  leadnestBranding,
}: {
  greeting: string;
  firstName: string;
  leadnestBranding?: boolean;
}) {
  const [query, setQuery] = useState("");
  const [projects, setProjects] = useState<MockProject[]>(initialMockProjects);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<MockProject | null>(null);

  const filteredMetrics = useMemo(
    () => (query ? metrics.filter((m) => matchesQuery(query, m.label, m.value, m.description)) : metrics),
    [query]
  );

  const filteredSteps = useMemo(
    () => (query ? onboardingSteps.filter((s) => matchesQuery(query, s.title, s.description)) : onboardingSteps),
    [query]
  );

  const filteredActivity = useMemo(
    () => (query ? recentActivity.filter((a) => matchesQuery(query, a.title, a.detail)) : recentActivity),
    [query]
  );

  const showMetrics = filteredMetrics.length > 0;
  const showOnboarding = filteredSteps.length > 0;
  const showCharts = !query || matchesQuery(query, "performance", "chart", "graph", "revenue", "engagement", "weekly", "monthly");
  const showActivity = filteredActivity.length > 0;
  const showCrudExample =
    !query || matchesQuery(query, "crud", "dialog", "modal", "project", "create", "edit");
  const noResults = !showMetrics && !showOnboarding && !showCharts && !showActivity && !showCrudExample;

  function openCreateDialog() {
    setEditingProject(null);
    setDialogOpen(true);
  }

  function openEditDialog(project: MockProject) {
    setEditingProject(project);
    setDialogOpen(true);
  }

  function handleSaveProject(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const owner = String(formData.get("owner") ?? "").trim();
    const status = String(formData.get("status") ?? "").trim();

    if (!name || !owner || !status) return;

    if (editingProject) {
      setProjects((prev) =>
        prev.map((project) =>
          project.id === editingProject.id
            ? { ...project, name, owner, status }
            : project
        )
      );
    } else {
      setProjects((prev) => [{ id: `p-${Date.now()}`, name, owner, status }, ...prev]);
    }

    setDialogOpen(false);
  }

  return (
    <>
      {/* Welcome banner */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              {leadnestBranding
                ? "Welcome to LeadNest"
                : `${greeting}, ${firstName}`}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {leadnestBranding
                ? "Your CRM home for leads, contacts, and deals."
                : "Here's what's happening across your workspace today."}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Button
                  key={action.label}
                  variant="outline"
                  size="sm"
                  asChild
                  className="gap-1.5"
                  disabled={action.href === "#"}
                >
                  <Link href={action.href}>
                    <Icon className="size-3.5" />
                    <span className="hidden sm:inline">{action.label}</span>
                  </Link>
                </Button>
              );
            })}
          </div>
        </div>
        <div className="relative w-full max-w-lg">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search dashboard..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9 h-10 bg-muted/50 border-muted-foreground/15 focus-visible:border-border focus-visible:bg-background"
          />
        </div>
      </div>

      {noResults && (
        <Card className="mb-8">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <Search className="size-10 text-muted-foreground/30 mb-3" />
            <p className="text-sm font-medium">No results found</p>
            <p className="text-xs text-muted-foreground mt-1">
              Try a different search term or clear the filter.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Metric cards */}
      {showMetrics && (
        <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {filteredMetrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <Card key={metric.label} className="relative overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardDescription className="text-sm font-medium">{metric.label}</CardDescription>
                  <div className="rounded-md bg-muted p-2">
                    <Icon className="size-4 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold tracking-tight">{metric.value}</div>
                  <div className="mt-1 flex items-center gap-1.5">
                    <Badge
                      variant="secondary"
                      className="rounded-md px-1.5 py-0 text-xs font-medium text-emerald-700 bg-emerald-500/10 dark:text-emerald-400 dark:bg-emerald-500/15 border-0"
                    >
                      {metric.trend}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{metric.description}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Middle section */}
      {(showOnboarding || showCharts) && (
        <div className="mb-8 grid gap-6 lg:grid-cols-5">
          {showOnboarding && (
            <Card className="lg:col-span-2">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Getting Started</CardTitle>
                  <Badge variant="outline" className="text-xs">
                    0 / {onboardingSteps.length}
                  </Badge>
                </div>
                <CardDescription>
                  {leadnestBranding
                    ? "Complete these steps to set up LeadNest for your team."
                    : "Complete these steps to set up your workspace."}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-1">
                {filteredSteps.map((step) => (
                  <Link
                    key={step.title}
                    href={step.href}
                    className="group flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-accent"
                  >
                    {step.done ? (
                      <CheckCircle2 className="size-[18px] shrink-0 text-emerald-500" />
                    ) : (
                      <Circle className="size-[18px] shrink-0 text-muted-foreground/40" />
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium leading-none">{step.title}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{step.description}</p>
                    </div>
                    <ArrowRight className="size-4 shrink-0 text-muted-foreground/40 transition-transform group-hover:translate-x-0.5 group-hover:text-muted-foreground" />
                  </Link>
                ))}
              </CardContent>
            </Card>
          )}

          {showCharts && (
            <Card className={showOnboarding ? "lg:col-span-3" : "lg:col-span-5"}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base">Weekly New Leads</CardTitle>
                    <CardDescription>New contacts added this week</CardDescription>
                  </div>
                  <Badge variant="outline" className="text-xs font-medium">
                    83 total
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <BarChart data={weeklyData} />
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Revenue chart */}
      {showCharts && (
        <div className="mb-8">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">Revenue Overview</CardTitle>
                  <CardDescription>Monthly revenue for the current year</CardDescription>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold tracking-tight">₹12,290</p>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">+8.0% from last month</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <AreaChart data={monthlyRevenue} />
            </CardContent>
          </Card>
        </div>
      )}

      {showCrudExample && (
        <div className="mb-8">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <CardTitle className="text-base">Projects</CardTitle>
                  <CardDescription>
                    Create and update your projects
                  </CardDescription>
                </div>
                <Button size="sm" onClick={openCreateDialog}>
                  Create project
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="flex items-center justify-between rounded-md border border-border/70 p-3"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium">{project.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Owner: {project.owner} • Status: {project.status}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditDialog(project)}
                    >
                      Edit
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingProject ? "Edit project" : "Create project"}
                </DialogTitle>
                <DialogDescription>
                  This is mock data in local component state. No backend call is made.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSaveProject} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="project-name">Project name</Label>
                  <Input
                    id="project-name"
                    name="name"
                    defaultValue={editingProject?.name ?? ""}
                    placeholder="Q2 Launch Event"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project-owner">Owner</Label>
                  <Input
                    id="project-owner"
                    name="owner"
                    defaultValue={editingProject?.owner ?? ""}
                    placeholder="Chirag"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project-status">Status</Label>
                  <Input
                    id="project-status"
                    name="status"
                    defaultValue={editingProject?.status ?? "Draft"}
                    placeholder="Draft"
                    required
                  />
                </div>

                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingProject ? "Save changes" : "Create"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      )}

      {/* Activity feed */}
      {showActivity && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">Recent Activity</CardTitle>
                <CardDescription>Latest events across your LeadNest workspace</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="gap-1.5 text-xs" disabled>
                View all
                <ArrowUpRight className="size-3" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-0">
              {filteredActivity.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={`${item.title}-${item.time}`}>
                    <div className="flex items-center gap-4 py-3">
                      <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-muted">
                        <Icon className="size-4 text-muted-foreground" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium">{item.title}</p>
                        <p className="text-xs text-muted-foreground">{item.detail}</p>
                      </div>
                      <span className="shrink-0 text-xs text-muted-foreground">{item.time}</span>
                    </div>
                    {i < filteredActivity.length - 1 ? <Separator /> : null}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}