import FormAuth from "@/features/user/components/FormAuth";
import Link from "next/link";

function page() {
  return (
    <div>
      <h2>login</h2>

      <FormAuth type="login" />

      <p>
        Aun no tienes una cuenta? <Link href="/register">Regístrate</Link>
      </p>
    </div>
  );
}

export default page;
