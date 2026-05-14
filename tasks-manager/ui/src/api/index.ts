
// const baseUrl = "http://localhost:5002";
const baseUrl = "";

const url = `${baseUrl}/api/v1/tasks`

export const fetchAllTasks = async () => {
    try {
        const response = await fetch(url);
        const { data } = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const addTask = async (name: string) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name})
    });
    return response.json();
}