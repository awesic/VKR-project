"use client"

import {ColumnDef} from "@tanstack/react-table";

export type Students = {
    id: number
    email: string
    fio: string
    group: string
    graduate_year: number
    status: string
}

export const columns: ColumnDef<Students>[] = [
    {
        accessorKey: "email",
        header: "Почта"
    },
    {
        accessorKey: "email",
        header: "ФИО"
    },
    {
        accessorKey: "email",
        header: "Группа"
    },
    {
        accessorKey: "email",
        header: "Год выпуска"
    },
    {
        accessorKey: "email",
        header: "Этап выполнения"
    }
]