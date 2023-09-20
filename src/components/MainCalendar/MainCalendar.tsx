import React, { FC, useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Task } from "../../interfaces/types";
import ApiService from "../../services/api";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const localizer = momentLocalizer(moment);

interface MainCalendarProps {}

const MainCalendar: FC<MainCalendarProps> = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskEvents, setTaskEvents] = useState<any[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await ApiService.fetchData<Task[]>("admin/tasks/");
        console.log("teste", res);

        const formattedTasks = res.map((task) => ({
          start: moment(task.startDate).toDate(),
          end: moment(task.deadline).toDate(),
          title: task.name,
          domain: task.taskDomain,
          id: task.id,
        }));

        {
        }

        setTasks(res);
        setTaskEvents(formattedTasks);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const eventPropGetter = (event: any) => {
    // Mapeamento de cores para taskDomains
    const domainColors: Record<number, string> = {
      1: "#FF6600",
      2: "#00CC66",
      3: "#9900CC",
      4: "#FF3399",
      5: "#3366FF",
      6: "#FF9933",
      7: "#996633",
    };

    const backgroundColor = domainColors[event.domain] || "gray"; // Cor padrão

    return {
      style: {
        backgroundColor,
      },
    };
  };

  const handleEditClick = (eventId: any) => {
    navigate(`/tasks/${eventId}`);
    console.log("entrou: ", eventId);
  };

  return (
    <div className="MainCalendar">
      <Calendar
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={taskEvents}
        style={{ height: "100vh" }}
        eventPropGetter={eventPropGetter}
        onSelectEvent={(event) => handleEditClick(event.id)}
      />
    </div>
  );
};

export default MainCalendar;
