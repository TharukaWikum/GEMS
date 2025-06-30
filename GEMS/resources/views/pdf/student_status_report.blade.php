<!DOCTYPE html>
<html>
<head>
    <title>Student Status Report</title>
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
    <h1>Student Status Report</h1>

    @foreach($statusData as $status => $students)
        <h2>{{ ucfirst(str_replace('_', ' ', $status)) }} ({{ count($students) }})</h2>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Target Country</th>
                    <th>Target Score</th>
                    <th>Preferred Course</th>
                </tr>
            </thead>
            <tbody>
                @forelse($students as $student)
                    <tr>
                        <td>{{ $student['name'] }}</td>
                        <td>{{ $student['email'] }}</td>
                        <td>{{ $student['target_country'] }}</td>
                        <td>{{ $student['target_score'] }}</td>
                        <td>{{ $student['preferred_course'] }}</td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="5" style="text-align: center; font-style: italic;">No students found for this status.</td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    @endforeach
</body>
</html>
