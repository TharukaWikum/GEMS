<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Payment Report</title>
    <style>
        body { font-size: 11px; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #999; padding: 5px; text-align: left; }
        th { background: #eee; }
    </style>
</head>
<body>
    <h2>Complete Payment Report</h2>
    <table>
        <thead>
            <tr>
                <th>Student</th>
                <th>Email</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Method</th>
                <th>Verified</th>
                <th>Verified By</th>
                <th>Verified At</th>
                <th>Rejected</th>
                <th>Rejected By</th>
                <th>Rejection Reason</th>
                <th>Course</th>
                <th>Receipt</th>
                <th>Created At</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($payments as $p)
                <tr>
                    <td>{{ $p['student_name'] }}</td>
                    <td>{{ $p['email'] }}</td>
                    <td>{{ $p['type'] }}</td>
                    <td>Rs. {{ number_format($p['amount'], 2) }}</td>
                    <td>{{ $p['method'] }}</td>
                    <td>{{ $p['verified'] }}</td>
                    <td>{{ $p['verified_by'] }}</td>
                    <td>{{ $p['verified_at'] }}</td>
                    <td>{{ $p['rejected'] }}</td>
                    <td>{{ $p['rejected_by'] }}</td>
                    <td>{{ $p['rejection_reason'] }}</td>
                    <td>{{ $p['course'] }}</td>
                    <td>{{ $p['receipt'] ? 'Yes' : 'No' }}</td>
                    <td>{{ $p['created_at'] }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>
