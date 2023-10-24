use smart_to_do;

select
au.app_user_id,
au.username,
au.password_hash,
au.enabled,
tzid.zone_id
from app_user au
inner join app_user_tz autz on au.app_user_id = autz.app_user_id
inner join time_zone_info tzid on autz.zone_id = tzid.zone_id
where username = 'john@smith.com';