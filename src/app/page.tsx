import { BasicExample, CustomExample } from "@/components/examples/basic";

export default function Home() {
  return (
    <div className="p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="space-y-8 p-8">
        <BasicExample />
        <CustomExample />
      </div>
    </div>
  );
}
