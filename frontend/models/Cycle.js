export class Cycle {
    /**
     * @param {string|number} id Identificador del ciclo
     * @param {Date|string} startDate Fecha de inicio de la menstruación
     * @param {Date|string|null} endDate Fecha final (antes del inicio del sig. ciclo). Si es nulo, es el ciclo actual
     * @param {number} averageDuration Duración promedio esperada del ciclo (en días)
     * @param {number} periodDuration Duración promedio del periodo/sangrado (en días)
     */
    constructor(id, startDate, endDate = null, averageDuration = 28, periodDuration = 5) {
        this.id = id;
        this.startDate = new Date(startDate);
        this.endDate = endDate ? new Date(endDate) : null;
        this.averageDuration = averageDuration;
        this.periodDuration = periodDuration;
    }

    /**
     * Calcula la fecha del próximo periodo basándose en el inicio actual y la duración promedio del ciclo
     * @returns {Date} Fecha aproximada del próximo periodo
     */
    calculateNextPeriod() {
        const nextPeriodDate = new Date(this.startDate);
        nextPeriodDate.setDate(nextPeriodDate.getDate() + this.averageDuration);
        return nextPeriodDate;
    }

    /**
     * Calcula la ventana fértil y el día de ovulación
     * @returns {Object} { start, end, ovulation } con objetos Date
     */
    calculateFertileWindow() {
        // La ovulación generalmente ocurre unos 14 días antes de la próxima menstruación
        const nextPeriod = this.calculateNextPeriod();
        const ovulationDay = new Date(nextPeriod);
        ovulationDay.setDate(ovulationDay.getDate() - 14);

        // La ventana fértil suele ser de unos 6 días: 5 previos a la ovulación y el día de la ovulación
        // Aquí usamos 3 días antes y 2 después como aproximación
        const fertileStart = new Date(ovulationDay);
        fertileStart.setDate(fertileStart.getDate() - 3);

        const fertileEnd = new Date(ovulationDay);
        fertileEnd.setDate(fertileEnd.getDate() + 2);

        return { start: fertileStart, end: fertileEnd, ovulation: ovulationDay };
    }

    /**
     * Determina la fase actual del ciclo basándose en una fecha
     * @param {Date} currentDate Fecha a evaluar (por defecto: hoy)
     * @returns {string} Nombre de la fase: Menstruación, Fase Folicular, Ventana Fértil, Fase Lútea
     */
    getCurrentPhase(currentDate = new Date()) {
        const nextPeriod = this.calculateNextPeriod();
        const diffDays = Math.floor((currentDate - this.startDate) / (1000 * 60 * 60 * 24));
        const { start, end } = this.calculateFertileWindow();
        
        if (diffDays < 0) return "Desconocida";
        if (diffDays < this.periodDuration) return "Menstruación";

        if (currentDate >= start && currentDate <= end) {
            return "Ventana Fértil / Ovulatoria";
        }
        
        const diffDaysToNext = Math.floor((nextPeriod - currentDate) / (1000 * 60 * 60 * 24));
        
        if (diffDaysToNext > 14) {
            return "Fase Folicular";
        } else {
            return "Fase Lútea";
        }
    }
}
