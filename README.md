![Smart Tasker Logo](./react-tasks/public/smarttasker.svg)

# Dev10 Capstone

## Introduction
The `SmartTasker` is a multi-faceted to-do list that assists users with task prioritization regardless of the external factors that may hinder completion. The application accomplishes this by providing weather and location information for relevant tasks to help users better prioritize tasks that may be affected by such. (For example, if the user has to cut the lawn, they need a non-rainy day; or someone who needs to visit the bank is limited by the bank's hours.)

***

## Table of Contents
1. [In-Depth Functionality](#in-depth-functionality)

   - [Main Functionality](#main-functionality)

   - [Stretch Functionality](#stretch-functionality)

2. [Learning Goal](#learning-goal)

3. [Plan](#plan)

   - [Agile Framework](#agile-framework)

   - [Kanban Tasks](#kanban-tasks)

4. [User Story](#user-story)

***

## In-Depth Functionality

### Main Functionality - _Completed_
- Provide a form for users to input tasks _(* is required)_
  - Name of Task *
  - Due Date
  - Location of Task _(* if outside house)_
  - Is it an outdoor task? (Boolean) *
  - Other Details
- List tasks
- Filter Tasks
- List weather for tasks listed as outdoors
- List store/location hours for tasks at external locations
  - List estimated commute time from home to second location

### Stretch Functionality - _Completed_
- Separate user accounts


### Future Development Plans
- Host application on Azure or AWS.
- Replace 'Is it an outdoor task?' with NLP to automatically infer if task is an outdoor task.
  - Use either Maven Stanford NLP or IBM Watson NLP
- Link with Google Calendar
- Prioritize tasks based on due dates, potential weather, and location closing times.

***

## Learning Goal

- Implement the following libraries/API:
  - Google Places API
  - Google Places Autocomplete
  - Google Maps API
  - Open Meteo API (Weather)
  - Material UI
  - LoDash

***
## Plan

### Agile Framework
I am running a modified version of `Scrum for One with Kanban` for this project. All tasks are listed in the main backlog in priority order and with time estimates (except for stretch goals, which are in the stretch backlog). Sprints are only 1 day long (due to the short length of this project). Sprint planning happens daily first thing in the morning; approximately 8 hours of tasks are moved into the sprint backlog from the top of the main backlog. That sprint is now set for the day; should a new task need to be added, it will be placed in the main backlog based on urgency. Each day ends with a documentation wrap-up, which is used to organize the kanban board and leave notes for future development days.

*(I know this strays from traditional Scrum and Kanban principles, but I have used and refined this modified version for several years now; it helps me organize small-scale and short term projects.)*

### Kanban Tasks

![Project Kanban Tasks](kanban_tasks.jpg)

***

## User Story

*(Assume the date is Mon, 8/3/2020)*

### 1. User adds tasks
   - Do laundry (Outdoors: No)
   - Cut Lawn (Outdoors: Yes)
   - Go Grocery Shopping (Location: Lidi, Outdoors: No)
   - Schedule Apt at DMV (Due Date: 8/6/2020, Location: DMV, Outdoors: No)
   
### 2. On the tasks screen, user sees the added tasks.

| Task | Due Date | Location | Outdoors? | User Details |
|:---:|:---:|:---:|:---:|:---:|
| Do Laundry | | | No | |
| Cut Lawn | | | Yes | | 
| Go Grocery Shopping | | Lidl | No | Need Eggs | 
| Schedule Apt at DMV | 8/9/2020 | DMV | No | Renew License |

### 3. On the home-screen, user sees tasks with pertinent external info.
  

| Task | Due Date | Task Information | User Details |
|:---:|:---:|:---:|:---:|
| Do Laundry | | | |
| Cut Lawn | |Sunny Tomorrow, Rain Next 7 Days | |
| Go Grocery Shopping | | Closes 9pm Everyday | Need Eggs |
| Schedule Apt at DMV | 8/7/2020* | Closes 4:30pm Next 5 Days, Closed Sat & Sun | Renew License |

    * Note Due Date Change Due to Location Being Closed on Original Due Date

### 4. User can ask SmartTasker to suggest task prioritization based on external factors.

| Task Priority | Task | Due Date | Task Information | User Details |
|:---:|:---:|:---:|:---:|:---:|
| 1 | Cut Lawn | |Sunny Tomorrow, Rain Next 7 Days | |
| 2 | Schedule Apt at DMV | 8/7/2020* | Closes 4:30pm Next 5 Days, Closed Sat & Sun | Renew License |
| 3 | Go Grocery Shopping | | Closes 9pm Everyday | Need Eggs |
| 4 | Do Laundry | | | |

### 5. SmartTasker will reprioritize on-the-fly as new tasks are added.

| Task Priority | Task | Due Date | Task Information | User Details |
|:---:|:---:|:---:|:---:|:---:|
| 1 | Email Boss | 8/4/2020 | | Send Report |
| 2 | Cut Lawn | |Sunny Tomorrow, Rain Next 7 Days | |
| 3 | Schedule Apt at DMV | 8/7/2020* | Closes 4:30pm Next 5 Days, Closed Sat & Sun | Renew License |
| 4 | Go Grocery Shopping | | Closes 9pm Everyday | Need Eggs |
| 5 | Do Laundry | | | |

