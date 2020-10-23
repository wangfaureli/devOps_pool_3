import axios from 'axios';
import { apiUrl } from "@/settings";

export default {
    //WorkingTimes
    getWorkingTimes: async (userId) => {
        const response = await axios.get(`${apiUrl}/workingtimes/${userId}`);
        return await response.data.data;
    },
    getWorkingTime: async (id, userId) => {
        const response = await axios.get(`${apiUrl}/workingtimes/${userId}/${id}`);
        return await response.data.data;
    },

    deleteWorkingTime: async (id) => {
        const response = await axios.delete(`${apiUrl}/workingtimes/${id}`);
        return await response.data.data;
    },
    createWorkingTime: async (start, end, userId) => {
        const response = await axios.post(`${apiUrl}/workingtimes/${userId}`, {
                working_time: {
                start: start,
                end: end
            }
        });
        return await response.data.data;
    },
    updateWorkingTime: async(start, end, id) => {
        const response = await axios.put(`${apiUrl}/workingtimes/${id}`, {
            working_time: {
                start: start,
                end: end
            }
        });
        return await response.data.data;
    },

    getUserClocks: async (userId) => {
        const response = await axios.get(`${apiUrl}/clocks/${userId}`);
        return await response.data.data;
    },
    // Users 
    getUsers: async () => {
        const response = await axios.get(`${apiUrl}/users/`);
        return await response.data.data;
    },
    getUser: async (userId) => {
        const response = await axios.get(`${apiUrl}/users/${userId}`);
        return await response.data.data;
    },
    deleteUser: async (userId) => {
        const response = await axios.delete(`${apiUrl}/users/${userId}`);
        return await response.data.data;
    },
    createUser: async (username, email) => {
        const response = await axios.post(`${apiUrl}/users`, {
            user: {
                username: username,
                email: email
            }
        });
        // return await response.data.data;
        console.log(response.data);
    },
    CreateClock: async (time, status, userId) => {
        const response = await axios.post(`${apiUrl}/clocks/${userId}`, {
            clock: {
                time: time,
                status: status,
                userid: userId
            }
        });
        // return await response.data.data;
        console.log(response.data);
    }

};