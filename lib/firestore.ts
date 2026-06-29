import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "./firebase";
import { Task } from "@/types/task";

const tasksRef = collection(db, "tasks");

/* -----------------------------
   CREATE
------------------------------ */

export async function createTask(task: Task) {
  return addDoc(tasksRef, task);
}

/* -----------------------------
   READ ALL USER TASKS
------------------------------ */

export async function getTasks(userId: string) {
  const q = query(
    tasksRef,
    where("userId", "==", userId),
    orderBy("deadline")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Task[];
}

/* -----------------------------
   READ SINGLE TASK
------------------------------ */

export async function getTask(id: string) {
  const snapshot = await getDoc(doc(db, "tasks", id));

  if (!snapshot.exists()) return null;

  return {
    id: snapshot.id,
    ...snapshot.data(),
  } as Task;
}

/* -----------------------------
   UPDATE ANY FIELD
------------------------------ */

export async function updateTask(
  id: string,
  data: Partial<Task>
) {
  return updateDoc(doc(db, "tasks", id), data);
}

/* -----------------------------
   COMPLETE TASK
------------------------------ */

export async function completeTask(
  id: string,
  completed: boolean
) {
  return updateDoc(doc(db, "tasks", id), {
    completed,
  });
}

/* -----------------------------
   DELETE TASK
------------------------------ */

export async function removeTask(id: string) {
  return deleteDoc(doc(db, "tasks", id));
}

/* -----------------------------
   DASHBOARD STATS
------------------------------ */

export async function getDashboardStats(userId: string) {
  const tasks = await getTasks(userId);

  const total = tasks.length;

  const completed = tasks.filter(
    (task) => task.completed
  ).length;

  const pending = total - completed;

  const upcoming = tasks.filter(
    (task) => !task.completed
  ).length;

  const productivity =
    total === 0
      ? 100
      : Math.round((completed / total) * 100);

  return {
    total,
    completed,
    pending,
    upcoming,
    productivity,
  };
}
/* -----------------------------
   MISSED TASKS
------------------------------ */

export async function getMissedTasks(userId: string) {
  const tasks = await getTasks(userId);

  const today = new Date();

  return tasks.filter((task) => {
    if (task.completed) return false;

    const deadline = new Date(task.deadline);

    return deadline < today;
  });
}