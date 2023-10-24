use smart_to_do;

select t.task_id, t.app_user_id, t.task_name, t.due_date, t.is_outdoors, t.google_places_id, t.task_details, tp.task_priority
from task t
inner join task_priority tp on t.task_id=tp.task_id
inner join app_user au on t.app_user_id=au.app_user_id
where username = 'john@smith.com';