import React, { useState } from 'react';
import { Event, events, getEventsByMonth } from '../../data/events';
import styles from './styles.module.css';

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface EventsCalendarProps {
  showHeader?: boolean;
  compact?: boolean;
}

export default function EventsCalendar({
  showHeader = true,
  compact = false,
}: EventsCalendarProps): React.ReactElement {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [view, setView] = useState<'calendar' | 'list'>('calendar');

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthEvents = getEventsByMonth(year, month);

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const firstDayOfWeek = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(new Date(year, month + (direction === 'next' ? 1 : -1), 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1));
  };

  const getEventsForDay = (day: number): Event[] => {
    const dayDate = new Date(year, month, day);
    const dayString = dayDate.toISOString().split('T')[0];

    return monthEvents.filter(event => {
      const eventDate = event.date;
      const eventEndDate = event.endDate;

      if (eventEndDate) {
        // Multi-day event
        return dayString >= eventDate && dayString <= eventEndDate;
      } else {
        // Single day event
        return eventDate === dayString;
      }
    });
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getEventTypeColor = (type: Event['type']): string => {
    switch (type) {
      case 'biannual':
        return '#e74c3c';
      case 'weekly':
        return '#3498db';
      case 'optional':
        return '#95a5a6';
      case 'virtual':
        return '#9b59b6';
      default:
        return '#34495e';
    }
  };

  const renderCalendarView = () => {
    const calendarDays = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      calendarDays.push(
        <div key={`empty-${i}`} className={styles.calendarDay}></div>
      );
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = getEventsForDay(day);
      const isToday =
        today.getDate() === day &&
        today.getMonth() === month &&
        today.getFullYear() === year;

      calendarDays.push(
        <div
          key={day}
          className={`${styles.calendarDay} ${isToday ? styles.today : ''} ${dayEvents.length > 0 ? styles.hasEvents : ''}`}
        >
          <div className={styles.dayNumber}>{day}</div>
          <div className={styles.dayEvents}>
            {dayEvents.slice(0, compact ? 1 : 3).map((event, index) => (
              <div
                key={`${event.id}-${index}`}
                className={styles.dayEvent}
                style={{ backgroundColor: getEventTypeColor(event.type) }}
                title={event.title}
              >
                {compact
                  ? '•'
                  : event.title.substring(0, 10) +
                    (event.title.length > 10 ? '...' : '')}
              </div>
            ))}
            {dayEvents.length > (compact ? 1 : 3) && (
              <div className={styles.moreEvents}>
                +{dayEvents.length - (compact ? 1 : 3)} more
              </div>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className={styles.calendarGrid}>
        {DAYS.map(day => (
          <div key={day} className={styles.dayHeader}>
            {day}
          </div>
        ))}
        {calendarDays}
      </div>
    );
  };

  const renderListView = () => {
    const upcomingEvents = events
      .filter(event => new Date(event.date) >= today)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 20);

    return (
      <div className={styles.listView}>
        {upcomingEvents.map(event => (
          <div key={event.id} className={styles.eventListItem}>
            <div
              className={styles.eventTypeIndicator}
              style={{ backgroundColor: getEventTypeColor(event.type) }}
            ></div>
            <div className={styles.eventDetails}>
              <h4 className={styles.eventTitle}>
                {event.url ? (
                  <a
                    href={event.url}
                    target={event.url.startsWith('http') ? '_blank' : '_self'}
                  >
                    {event.title}
                  </a>
                ) : (
                  event.title
                )}
              </h4>
              <div className={styles.eventMeta}>
                <span className={styles.eventDate}>
                  {formatDate(event.date)}
                  {event.endDate && ` - ${formatDate(event.endDate)}`}
                </span>
                {event.location && (
                  <span className={styles.eventLocation}>{event.location}</span>
                )}
              </div>
              {event.description && (
                <p className={styles.eventDescription}>{event.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={styles.eventsCalendar}>
      {showHeader && (
        <div className={styles.calendarHeader}>
          <div className={styles.calendarControls}>
            <button
              onClick={() => navigateMonth('prev')}
              className={styles.navButton}
            >
              ←
            </button>
            <h3 className={styles.monthTitle}>
              {MONTHS[month]} {year}
            </h3>
            <button
              onClick={() => navigateMonth('next')}
              className={styles.navButton}
            >
              →
            </button>
          </div>
          <div className={styles.viewControls}>
            <button onClick={goToToday} className={styles.todayButton}>
              Today
            </button>
            <div className={styles.viewToggle}>
              <button
                onClick={() => setView('calendar')}
                className={`${styles.viewButton} ${view === 'calendar' ? styles.active : ''}`}
              >
                Calendar
              </button>
              <button
                onClick={() => setView('list')}
                className={`${styles.viewButton} ${view === 'list' ? styles.active : ''}`}
              >
                List
              </button>
            </div>
          </div>
        </div>
      )}

      {view === 'calendar' ? renderCalendarView() : renderListView()}

      {showHeader && (
        <div className={styles.legend}>
          <div className={styles.legendItem}>
            <div
              className={styles.legendColor}
              style={{ backgroundColor: '#e74c3c' }}
            ></div>
            <span>Biannual Events</span>
          </div>
          <div className={styles.legendItem}>
            <div
              className={styles.legendColor}
              style={{ backgroundColor: '#3498db' }}
            ></div>
            <span>Weekly Meetings</span>
          </div>
          <div className={styles.legendItem}>
            <div
              className={styles.legendColor}
              style={{ backgroundColor: '#95a5a6' }}
            ></div>
            <span>Optional Events</span>
          </div>
        </div>
      )}
    </div>
  );
}
