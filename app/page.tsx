import ApplicationForm from "@/components/applicationForm";

export default function Home() {
    return (
        <main className="flex flex-col p-10 items-center gap-10">
            <h1 className="text-3xl">Podanie do Internatu</h1>
            <ApplicationForm/>
        </main>
    )
}
