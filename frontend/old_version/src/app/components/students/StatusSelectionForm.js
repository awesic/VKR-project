import React, {useEffect, useState} from "react";
import {Form} from "react-bootstrap";
import {axiosPublic} from "../../features/useAxios";

const StatusSelectionForm = ({selectedStatus, onSelectedStatus}) => {
    const [statusList, setStatusList] = useState([])

    useEffect(() => {
        const fetchStatuses = async () => {
            if (statusList.length === 0) {
                try {
                    const response = await axiosPublic.get('/api/v1/status')
                    setStatusList(response.data)
                } catch (error) {
                    console.log(error)
                }
            }
        }
        fetchStatuses()
    }, []);

    return (
        <>
            <Form.Select size={"lg"}
                id={"status"}
                name={"status"}
                value={selectedStatus}
                onChange={e => onSelectedStatus(e.target.value, statusList.filter(st => st.status === e.target.value).status_name)}
                className={"rounded-3"}>
                {statusList.map((status) => (
                    <option key={status.status} value={status.status}>
                        {status.status_name}
                    </option>
                ))}
            </Form.Select>
        </>
    )
}
export default StatusSelectionForm