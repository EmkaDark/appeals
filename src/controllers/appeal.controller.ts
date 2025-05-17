import { Between } from "typeorm";
import { Appeal, AppealStatus } from "../entity/appeal.entity";
import { appealRepository } from "../repositories/appeal.repository";
import { Request, Response } from "express";

export class AppealController {
  static async getAppeals(req: Request, res: Response) {
    try {
      const { date, start, end } = req.query;
      const selectedDate = new Date(date as string);
      const startDate = new Date(start as string);
      const endDate = new Date(end as string);
      const nextDay = new Date(selectedDate);
      nextDay.setDate(nextDay.getDate() + 1);

      if (date) {
        const appeal = await appealRepository.find({
          where: {
            created_at: Between(selectedDate, new Date(nextDay.getTime() - 1)),
          },
        });
        res.status(200).json(appeal);
        return;
      }

      if (start && end) {
        const appeals = await appealRepository.find({
          where: { created_at: Between(startDate, endDate) },
        });
        res.status(200).json(appeals);

        return;
      }
      const appeals = await appealRepository.find();
      res.status(200).json(appeals);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Ошибка чтения данных" });
    }
  }

  static async createAppeal(req: Request, res: Response) {
    const { text } = req.body;

    try {
      const appeal = new Appeal();
      appeal.text = text;
      await appealRepository.save(appeal);
      res.status(201).json({ appeal, message: "Обращение создано" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Ошибка при создании обращения" });
    }
  }

  static async startWork(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const appeal = await appealRepository.findOne({ where: { id } });
      if (!appeal) {
        res.status(404).json({ error: "Обращение не найдено!" });
        return;
      }
      if (appeal.status === AppealStatus.IN_PROGRESS) {
        res
          .status(200)
          .json({ message: 'Обращение уже в статусе "В процессе"' });
      }
      appeal.status = AppealStatus.IN_PROGRESS;

      await appealRepository.save(appeal);
      res.status(200).json({ appeal, message: "Обращение взято в работу" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Ошибка при обновлении статуса" });
    }
  }
  static async endAppeal(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { text } = req.body;
      const appeal = await appealRepository.findOne({ where: { id } });

      if (!appeal) {
        res.status(404).json({ error: "Обращение не найдено" });
        return;
      }

      appeal.status = AppealStatus.COMPLETED;
      appeal.resolution = text;
      await appealRepository.save(appeal);
      res.status(200).json({ appeal, message: "Обращение завершено" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Ошибка при завершении обращеия " });
    }
  }
  static async cancelAppeal(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { text } = req.body;
      const appeal = await appealRepository.findOne({ where: { id } });

      if (!appeal) {
        res.status(404).json({ message: "Обращение не найдено" });
        return;
      }

      appeal.resolution = text;
      appeal.status = AppealStatus.CANCELED;

      await appealRepository.save(appeal);
      res.status(200).json({ appeal, message: "Обращение отменено" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Ошибка отмены обращения" });
    }
  }

  static async cancelAll(req: Request, res: Response) {
    try {
      const appeals = await appealRepository.find({
        where: { status: AppealStatus.IN_PROGRESS },
      });

      if (appeals.length === 0) {
        res
          .status(404)
          .json({ message: 'Обращение в статусе "в работе" отсутствуют' });
      }

      await appealRepository.update(
        {
          status: AppealStatus.IN_PROGRESS,
        },
        { status: AppealStatus.CANCELED }
      );

      const updateAppeals = await appealRepository.find({
        where: { status: AppealStatus.CANCELED },
      });

      res.status(200).json({ updateAppeals, message: "Обращения отменены" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Ошибка отмены обращений" });
    }
  }
}
