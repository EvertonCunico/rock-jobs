export class DateUtils {
    static formatDate(date) {
        if (!date) return '';
        return new Date(date).toLocaleDateString('pt-BR');
    }

    static formatTime(time) {
        if (!time) return '';
        return new Date(time).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    }

    static formatDateTime(dateTime) {
        if (!dateTime) return '';
        return new Date(dateTime).toLocaleString('pt-BR');
    }
}