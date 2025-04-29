export interface Course {
  _id?: string;
  title?: string;
  description?: string;
  price?: number;
  videos?: { topic: string; link: string }[];
  thumbnail?: string | File;
}

export interface CardDetails {
  _id?: string;
  cardholderName?: string;
  cardNumber?: string;
  cvv?: number;
  expDate?: string;
}

export interface CoursePurchase {
  _id?: string;
  courseId?: string;
  userId?: string;
  purchaseDate?: Date;
  expiryDate?: Date;
}
