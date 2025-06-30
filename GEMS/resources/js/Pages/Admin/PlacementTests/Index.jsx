import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import ScheduledTestsTable from "./ScheduledTestsTable";
import PendingResultsTable from "./PendingResultsTable";
import CompletedTestsTable from "./CompletedTestsTable";

export default function Index({ auth, scheduled, pending, completed }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Placement Tests" />
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl font-bold mb-6">Placement Tests</h2>
                <ScheduledTestsTable tests={scheduled} />
                <PendingResultsTable tests={pending} />
                <CompletedTestsTable tests={completed} />
            </div>
        </AuthenticatedLayout>
    );
}
