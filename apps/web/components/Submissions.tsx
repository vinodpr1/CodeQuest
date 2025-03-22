import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../src/components/ui/table"

export default function Submissions() {
  return (
    <div className="overflow-x-auto bg-gray-50 rounded">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Submission ID</TableHead>
            <TableHead>Result</TableHead>
            <TableHead>Tests Passed</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Memory</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>123456</TableCell>
            <TableCell className="text-green-500">AC</TableCell>
            <TableCell>3/5</TableCell>
            <TableCell>0.2s</TableCell>
            <TableCell>256MB</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>789012</TableCell>
            <TableCell className="text-red-500">WA</TableCell>
            <TableCell>2/5</TableCell>
            <TableCell>0.5s</TableCell>
            <TableCell>128MB</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>345678</TableCell>
            <TableCell className="text-yellow-500">TLE</TableCell>
            <TableCell>1/5</TableCell>
            <TableCell>10.0s</TableCell>
            <TableCell>512MB</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>901234</TableCell>
            <TableCell className="text-green-500">AC</TableCell>
            <TableCell>4/5</TableCell>
            <TableCell>0.3s</TableCell>
            <TableCell>256MB</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>567890</TableCell>
            <TableCell className="text-red-500">WA</TableCell>
            <TableCell>2/5</TableCell>
            <TableCell>0.7s</TableCell>
            <TableCell>128MB</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}