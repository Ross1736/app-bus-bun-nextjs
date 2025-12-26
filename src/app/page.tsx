import Link from "next/link";

function page() {
  return (
    <div>
      <h3>Hello world</h3>

      <Link href="/login">ir a login</Link>
    </div>
  );
}

export default page;
