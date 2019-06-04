# Fitman - Fitness Manager Application
# Node.js and Express Rest API
# Serving frontend app on localhost:3000 which is the only docker exposed port

## Important notice! - docker-compose up should be run 2 times cause of mentioned problem when downloading db(mysql) image
## Database filling script will fill database automatically on start
## MongoDB is present for preparing Milestone 3, for now just established connection using mongoose package

## Description
Milestone 2 - IMSE
Application Stack: Node.js, Express, Mysql, MongoDB(for M3)
Frontend Stack:    Vue.js (built in public folder of api)

2.1 Infrastructure
- IS container composition, isolation and deployment - DONE
- HTTPS                                              - NOT DONE

2.2. Logical/Physical database design                - DONE
2.3. Data import                                     - DONE
2.4. Implementation Web system (relational DBMS)
 - main business use case                            - PARTIAL
 - reporting use case                                - DONE

Opening localhost:3000 you will get frontend app in the view of gym manager
"Green" events are marked as free and don't have assigned trainer which will be use later(not implemented yet)
in trainer gui to send request for.
if you click on empty date, you will get modal for creating new training as gym manager




Mihajlo Nikodijevic
01646292
