import FormAuth from "@/features/user/components/FormAuth";
import Link from "next/link";

function page() {
  return (
    <div>
      <h2>register</h2>

      <FormAuth type="register" />

      <p>
        Ya tienes una cuenta? <Link href="/login">Ingresa</Link>
      </p>
    </div>
  );
}

export default page;
