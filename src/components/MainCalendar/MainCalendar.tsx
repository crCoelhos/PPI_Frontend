import React, { FC, useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Task } from "../../interfaces/types";
import ApiService from "../../services/api";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import {
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
} from "@mui/material";

const localizer = momentLocalizer(moment);

interface MainCalendarProps {}
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const MainCalendar: FC<MainCalendarProps> = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskEvents, setTaskEvents] = useState<any[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await ApiService.fetchData<Task[]>("admin/tasks/");
        // console.log("teste", res);

        const formattedTasks = res.map((task) => ({
          start: moment(task.startDate).toDate(),
          end: moment(task.deadline).toDate(),
          title: task.name,
          domain: task.taskDomain,
          id: task.id,
          taskStatus: task.taskStatus,
        }));

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
  };

  const filterTasksByStatus = (status: string | null) => {
    if (status === null) {
      return taskEvents;
    }

    return taskEvents.filter((task) => task.taskStatus === status);
  };

  const filteredTaskEvents = filterTasksByStatus(selectedStatus);
  // console.log(filteredTaskEvents);

  return (
    <div className="MainCalendar">
      <FormControl sx={{ m: 1, width: 248 }}>
        <InputLabel id="firstMonth-label">Filtros</InputLabel>
        <Select
          labelId="firstMonth"
          id="firstMonth"
          value={selectedStatus || "all"}
          onChange={(event) => {
            setSelectedStatus(
              event.target.value === "all"
                ? null
                : (event.target.value as string)
            );
          }}
          input={<OutlinedInput label="firstMonth" />}
          MenuProps={MenuProps}
        >
          <MenuItem key="0" value="all">
            SELECIONE UM FILTRO
          </MenuItem>
          <MenuItem key="1" value="COMPLETED">
            CONCLUIDOS
          </MenuItem>
          <MenuItem key="2" value="CANCELED">
            CANCELADOS
          </MenuItem>
          <MenuItem key="3" value="PAUSED">
            PAUSADOS
          </MenuItem>
          <MenuItem key="4" value="INPROGRESS">
            EM PROGRESSO
          </MenuItem>
          <MenuItem key="5" value="TO_ESTIMATE">
            ORÇAMENTAR
          </MenuItem>
          <MenuItem key="6" value="WAITING">
            AGUARDANDO
          </MenuItem>
          <MenuItem key="7" value="OVERDUE">
            ATRASADOS
          </MenuItem>
        </Select>
      </FormControl>
      <Calendar
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={filteredTaskEvents}
        style={{ height: "100vh" }}
        eventPropGetter={eventPropGetter}
        onSelectEvent={(event) => handleEditClick(event.id)}
      />
    </div>
  );
};

export default MainCalendar;
