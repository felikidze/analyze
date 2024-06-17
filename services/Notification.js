import {default as nodemailer} from 'nodemailer';

import UserRepository from '../repositories/User.js';

class NotificationService {
  static async sendSuccess(receiverId) {
      const response = await UserRepository.getUserDataById(receiverId);

      if (!response.email) {
          return;
      }

      const transport = nodemailer.createTransport({
          service: "gmail",
          auth: {
              user: "utmncontentanalyzer@gmail.com",
              pass: "iofwunedbpaaucyk"
          }
      });

      transport.sendMail({
          from: "UTMN Content Analyzer",
          to: response.email,
          subject: "Информация по сканированию",
          text: "Результаты сканирования готовы. Можете с ними ознакомиться в разделах Лента/Домены"
      });
  }
}

export default NotificationService;