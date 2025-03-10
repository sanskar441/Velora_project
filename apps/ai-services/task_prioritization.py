from sklearn.ensemble import RandomForestClassifier
import numpy as np

def prioritize_task(deadline_days, complexity, workload):
    # Sample data for demonstration – in real scenarios, use historical data
    data = np.array([[5, 3, 50], [2, 5, 80], [10, 2, 30]])
    priority = np.array([1, 1, 0])
    model = RandomForestClassifier()
    model.fit(data, priority)
    return model.predict([[deadline_days, complexity, workload]])[0]