// resources/js/Pages/Admin/Payments/Index.jsx
import React from "react";
import { Head, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PendingPaymentsTable from "./PendingPaymentsTable";
import VerifiedPaymentsTable from "./VerifiedPaymentsTable";
import RejectedPaymentsTable from "./RejectedPaymentsTable";

export default function PaymentsPage({
    pendingPayments,
    verifiedPayments,
    rejectedPayments,
}) {
    return (
        <AuthenticatedLayout
            // user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Payments
                    </h2>
                </div>
            }
        >
            {/* <div className="p-6">
                <Head title="Payments" />

                <VerifyRegistration pendingPayments={pendingPayments} />
            </div> */}
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">
                    Payment Verification Dashboard
                </h1>

                <div className="mb-10">
                    <PendingPaymentsTable payments={pendingPayments} />
                </div>

                <div className="mb-10">
                    <VerifiedPaymentsTable payments={verifiedPayments} />
                </div>

                <div className="mb-10">
                    <RejectedPaymentsTable payments={rejectedPayments} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
