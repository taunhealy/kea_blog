import { getServerSession } from "next-auth/next";
import { authOptions } from "@/server/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto py-8">
        <div className="mb-6 flex items-center justify-center gap-3">
          <h1 className="text-3xl font-bold text-black">Dashboard</h1>
          <Link href="/admin/posts">
            <Button className="bg-blue-500 text-white">View Posts</Button>
          </Link>
        </div>
        {children}
      </main>
    </div>
  );
}
