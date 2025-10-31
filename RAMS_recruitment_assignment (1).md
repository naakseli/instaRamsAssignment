# Resource Allocation Management System

This requirement is divided into two parts: the background story and the actual assignment. Read both parts carefully before proceeding further.

## Story

> Disclaimer: The project described is completely fictional. Any resemblance to real projects, past or present, is purely coincidental.

### Intro

Welcome to the project team!
The project has started for "Resource Allocation Management System" for a large industrial customer whose operations require careful planning of resource usage.

### Current system

The system currently being used is severely outdated, difficult to maintain and it has not been possible to integrate it to the newer cloud-based systems that the company has in place. Instead of spending any more money and time to maintain the old resource management system, the company has decided to invest in development of a new cloud-based system and use this opportunity to also re-design the UI instead of replicating it.

The main responsibilities of the system include:

- Allocating resources (personnel/machinery) to a factory (location).
- Scheduling reservations for resources.
- Overview of allocated resources by type and location.
- Access to resources and features depends on the users' role: For example, managers can update personnel and factory information, while lower access level users are only allowed to allocate said resources.

### Project status

Design workshops with customer's UX designer and discussions about the project details are ongoing. However, the customer would prefer to see a technical prototype/proof of concept for the new system as soon as possible to aid in the decision making process, clarify budgeting and get internal buy-in. The currently known expectations for the new system are:

- The system is a cloud-based web application, running in company's own cloud provider tenancy.
- There are no existing designs for the UI. The company will later provide specifications for the visual style and UI implementation once the system's specifications have been decided on, while also taking the findings provided by the prototype/PoC into account.
- Databases are used for persistent data.
- Frontend framework has not been decided yet and the customer trusts the development team to make the choice (and to provide the reasons for it).
- The language used in backend has not been decided yet either. The customer is familiar with .NET and NodeJS, but is open for other options as well.

### Your role in the project

Your project lead and the customer have agreed to take you on board, and you are to join the next project workshop. Starting with this workshop, the development team is expected to demonstrate the current state of the new system using a prototype/PoC to kickstart the discussion. Your task is to get the prototype started and implement as many of the already decided functionalities (see the task list below) as you possibly can before the next workshop.

## Recruitment assignment

Your work on this assignment will be discussed further in the technical review. The purpose of this assignment is to provide you a way demonstrate your technical skills and decision making process, and you are not expected to complete every task in the indended schedule for this assignment (see practical tips below).

While technical skills are an important part of the evaluation criteria, we are especially interested about your ability to explain your work and decisions you have made, and what changes and/or improvements you would make going forward if you were given more time.

The outcome of this assignment is not expected to be finished or perfect. It is, however, expected to be in executable state.

**Deliverable:**

- Your implementation of the assignment

**Practical tips:**

- Do not spend more than a couple of evenings for this assignment. On average, you are not expected to use more than 2 hours per task.
- The code is not expected to be perfect (it cannot be).
- You can freely decide which tasks to implement and in what order. We'll be interested to hear what led you to these decisions though!
- Using AI tools is not prohibited but you are expected to point out where and why they were used during the interview.
- Focus on the big picture and aim to get as much work done as possible instead of getting stuck in the details.

**Evaluation criteria:**

- Clear instructions on how to run your app.
- You are able to explain your decisions.
- You are able to explain technical nuances of your solution, if needed.
- Code quality (clean, readable, and not over-engineered).

### Tasks

Choose the tasks you would like to work on. You are free to choose how you implement them and they don't have to be completed to the same level of detail.

#### 1. Factory information (high priority)

System should allow users to manage factory information.

- Factory name - Unique, not empty
- Factory time zone - [IANA TimeZone identifier](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones), not empty.

#### 2. Personnel information (high priority)

System should allow users to manage personnel information.

- Personal ID - Unique, not empty.
- Full name - Not empty.
- Email - Unique, not empty.
- List of factories where this person can be allocated.

#### 3. Reservations (high priority)

System should allow users to manage personnel reservations.

- Each reservation includes a factory where the person is allocated to.
- Each reservation includes at least one person.
- Each reservation requires a start and an end time (date and time, in a format of your choosing)
- A person can only be allocated to one factory at any moment of time, but can otherwise have multiple reservations.
- A person can only be allocated to a predefined list of factories (see task #2).

#### 4. Scheduling overview (high priority)

System should provide users with an overview of personnel reservations.

- Per person - Reservations including their durations (in hours).
- Per factory - Reservations including sum of hours from all the reservations for the factory.

#### 5. Authentication and authorization plan (low priority)

- System should support different user roles to limit system access for non-administrative users.
- Instead of implementing, you can plan and describe how you would approach authentication and authorization, and how these would affect the other tasks in this list.