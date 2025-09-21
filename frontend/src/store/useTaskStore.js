import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

const useTaskStore = create((set, get) => ({
  tasks: [],
  isFetchingTasks: false,
  getTasks: async () => {
    set({ isFetchingTasks: true });
    try {
      const res = await axiosInstance.get("/tasks");
      set({ tasks: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isFetchingTasks: false });
    }
  },
  addTask: async (title) => {
    try {
      const res = await axiosInstance.post("/tasks", { title });
      set({ tasks: [...get().tasks, res.data] });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
  toggleTask: async (id, completed) => {
    try {
      await axiosInstance.put(`/tasks/${id}`, { completed });
      set({
        tasks: get().tasks.map((task) =>
          task._id === id ? { ...task, completed } : task
        ),
      });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
  deleteTask: async (id) => {
    try {
      await axiosInstance.delete(`/tasks/${id}`);
      set({ tasks: get().tasks.filter((task) => task._id !== id) });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
}));

export default useTaskStore;