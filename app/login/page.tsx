import LoginForm from "@/app/ui/admin/LoginForm";

export default function LoginPage() {
  return (
    <main className="flex justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[520px] flex-col p-4 pt-10">
        <LoginForm />
      </div>
    </main>
  );
}
