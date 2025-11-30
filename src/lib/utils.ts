export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-4);
  return `${day}/${month}/${year}`;
};

export const getRadiologyTypeColor = (
  type: 'X-Ray' | 'CT' | 'MRI' | 'Ultrasound' | 'PET'
): string => {
  const colors = {
    'X-Ray': 'bg-blue-100 text-blue-800',
    'CT': 'bg-purple-100 text-purple-800',
    'MRI': 'bg-pink-100 text-pink-800',
    'Ultrasound': 'bg-green-100 text-green-800',
    'PET': 'bg-orange-100 text-orange-800',
  };
  return colors[type];
};

export const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};