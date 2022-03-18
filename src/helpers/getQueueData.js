import axios from "axios";

export const getQueueData = async () => {
    try {
        const {data} = await axios.get('http://localhost:8080/ultimos');
        return data.ultimos;
    } catch (error) {
        console.log(error);
    }
}