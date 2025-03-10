from fastapi import FastAPI
from task_prioritization import prioritize_task

app = FastAPI()

@app.get("/task-priority")
def get_priority(deadline_days: int, complexity: int, workload: int):
    priority = prioritize_task(deadline_days, complexity, workload)
    return {"priority": int(priority)}