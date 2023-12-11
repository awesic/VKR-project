def map_status_list_to_json(statuses_list):
    status_map = []
    for status in statuses_list:
        temp_dict = {'status': status[0], 'status_name': status[1]}
        status_map.append(temp_dict)

    return status_map
