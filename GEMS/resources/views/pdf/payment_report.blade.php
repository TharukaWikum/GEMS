<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Payment Report</title>
    <style>
        body {
            font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
            font-size: 13px;
            margin: 20px;
            color: #333;
        }

        h1 {
            text-align: center;
            color: #2c3e50;
            font-size: 24px;
            margin-bottom: 40px;
            border-bottom: 2px solid #2c3e50;
            padding-bottom: 10px;
        }

        h2 {
            margin-top: 40px;
            font-size: 18px;
            color: #34495e;
            border-left: 5px solid #3498db;
            padding-left: 10px;
            background-color: #ecf6fc;
            padding: 8px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
            margin-bottom: 30px;
        }

        th, td {
            border: 1px solid #ccc;
            padding: 8px 10px;
            text-align: left;
        }

        th {
            background-color: #f2f2f2;
            color: #2c3e50;
        }

        tr:nth-child(even) {
            background-color: #f9f9f9;
        }

        tr:hover {
            background-color: #e8f4ff;
        }
    </style>
</head>
<body>
    <h1>Payment Report</h1>

    @if($start_date && $end_date)
        <p style="text-align: center;"><strong>From:</strong> {{ $start_date }} &nbsp; <strong>To:</strong> {{ $end_date }}</p>
    @endif

    @php
        $verifiedPayments = $payments->filter(fn($p) => $p['verified'] === 'Yes');
        $rejectedPayments = $payments->filter(fn($p) => $p['rejected'] === 'Yes');
        $pendingPayments = $payments->filter(fn($p) => $p['verified'] === 'No' && $p['rejected'] === 'No');
    @endphp

    @foreach(['Verified Payments' => $verifiedPayments, 'Rejected Payments' => $rejectedPayments, 'Pending Payments' => $pendingPayments] as $category => $group)
        <h2>{{ $category }} ({{ $group->count() }})</h2>

        <table>
            <thead>
                <tr>
                    <th>Student</th>
                    <th>Email</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Method</th>
                    <th>Verified By</th>
                    <th>Verified At</th>
                    <th>Rejected By</th>
                    <th>Rejected At</th>
                    <th>Reason</th>
                    <th>Course</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                @forelse($group as $payment)
                    <tr>
                        <td>{{ $payment['student_name'] }}</td>
                        <td>{{ $payment['email'] }}</td>
                        <td>{{ $payment['type'] }}</td>
                        <td>{{ number_format($payment['amount'], 2) }}</td>
                        <td>{{ $payment['method'] }}</td>
                        <td>{{ $payment['verified_by'] }}</td>
                        <td>{{ $payment['verified_at'] }}</td>
                        <td>{{ $payment['rejected_by'] }}</td>
                        <td>{{ $payment['rejected_at'] }}</td>
                        <td>{{ $payment['rejection_reason'] }}</td>
                        <td>{{ $payment['course'] }}</td>
                        <td>{{ $payment['created_at'] }}</td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="12" style="text-align: center; font-style: italic;">No {{ strtolower($category) }} found.</td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    @endforeach
</body>
</html>
