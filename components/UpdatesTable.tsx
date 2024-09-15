import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ScrollArea } from './ui/scroll-area'
import { Update } from '@/app/page'

export function UpdatesTable({ updates } : { updates: Update[] }) {
  return (
    <ScrollArea className='relative h-[720px] max-h-[720px]'>
    <Table className='w-full table-fixed'>
      <TableHeader >
        <TableRow>
          <TableHead className="w-[300px]">Package</TableHead>
          <TableHead className='text-center'>Actual Version</TableHead>
          <TableHead className='text-center'>Last Version</TableHead>
          <TableHead className="text-center">Update Type</TableHead>
        </TableRow>
      </TableHeader>

        <TableBody className='overflow-y-auto h-[600px]'>
          {updates.map((update) => (
            <TableRow key={update?.package}
              className={`hover:brightness-110 ${update?.updateType === "major" ? "bg-red-500/20" :
                update?.updateType === "patch" ? "bg-slate-300/20" : "bg-yellow-500/20"}`}>
              <TableCell>{update?.package}</TableCell>
              <TableCell className='text-center'>{update?.currentVersion}</TableCell>
              <TableCell className='text-center'>{update?.latestVersion}</TableCell>
              <TableCell className='text-center'>{update?.updateType}</TableCell>
            </TableRow>
          ))}
        </TableBody>
    </Table>
</ScrollArea>
  )
}
