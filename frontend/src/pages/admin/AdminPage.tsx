import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ChevronsRight } from "lucide-react";
import { Link } from "react-router-dom";

export const AdminTeachersListCard = () => {
    return (
        <Card className="h-min">
            <CardHeader>
                <CardTitle>Список преподавателей</CardTitle>
            </CardHeader>
            {/* <CardContent className="text-neutral-600">
                Список студентов, которые выбрали Вас научным руководителем
            </CardContent> */}
            <CardFooter>
                <Link to={"/admin/teachers"}>
                    <Button variant={"outline"} className="text-lg" size={"lg"}>
                        Перейти {<ChevronsRight className="ml-3" />}
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
};

export const AdminStudentsListCard = () => {
    return (
        <Card className="h-min">
            <CardHeader>
                <CardTitle>Список студентов</CardTitle>
            </CardHeader>
            {/* <CardContent className="text-neutral-600">
                Список студентов, которых Вы выбрали
            </CardContent> */}
            <CardFooter>
                <Link to={"/admin/students"}>
                    <Button variant={"outline"} className="text-lg" size={"lg"}>
                        Перейти {<ChevronsRight className="ml-3" />}
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
};
