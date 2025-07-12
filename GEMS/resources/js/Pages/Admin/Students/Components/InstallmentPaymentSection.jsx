import React from "react";
import StaffInstallmentPaymentForm from "../StaffInstallmentPaymentForm";

export default function InstallmentPaymentSection({ studentId, applications, payments }) {
    const registeredInstallmentApp = applications.find(
        (app) => app.status === "registered" && app.payment_type === "installment"
    );

    const totalPaid = payments
        .filter((p) => p.application_id === registeredInstallmentApp?.id && !p.rejected)
        .reduce((sum, p) => sum + p.amount, 0);

    const isFullyPaid = totalPaid >= (registeredInstallmentApp?.full_amount || 0);

    if (registeredInstallmentApp && !isFullyPaid) {
        return <StaffInstallmentPaymentForm studentId={studentId} application={registeredInstallmentApp} />;
    }

    return null;
}
