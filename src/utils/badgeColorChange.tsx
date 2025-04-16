export const getPriorityBadgeStyle = (priority: string) => {
  switch (priority?.toLowerCase()) {
    case 'high':
      return {
        backgroundColor: '#FDE6E6',
        color: '#D32F2F'
      };
    case 'medium':
      return {
        backgroundColor: '#FFF39A',
        color: '#795548'
      };
    case 'low':
      return {
        backgroundColor: '#E8FDE6',
        color: '#388E3C'
      };
    default:
      return {
        backgroundColor: '#FFD1D1',
        color: '#D32F2F'
      };
  }
};

export const getStatusBadgeStyle = (status: string) => {
  switch (status?.toLowerCase()) {
    case 'completed':
      return {
        backgroundColor: '#E8FDE6',
        color: '#388E3C'
      };
    case 'inprogress':
      return {
        backgroundColor: '#FFF39A',
        color: '#795548'
      };
    default:
      return {
        backgroundColor: '#FFD1D1',
        color: '#D32F2F'
      };
  }
};