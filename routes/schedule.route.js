const express = require("express");
const ScheduleModel = require("../models/schedule.model.js");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const schedule = await ScheduleModel.create(req.body);
    res.status(200).json(schedule);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.patch("/:monthId/addDay", async (req, res) => {
  const { monthId } = req.params;
  const { day, description, times } = req.body;

  try {
    const result = await ScheduleModel.findByIdAndUpdate(
      monthId,
      {
        $push: {
          days: {
            day: new Date(day),
            description,
            times,
          },
        },
      },
      { new: true }
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.patch("/:monthId/addTime/:dayId", async (req, res) => {
  const { monthId, dayId } = req.params;
  const { time, slots, available } = req.body;

  try {
    const result = await ScheduleModel.findOneAndUpdate(
      { _id: monthId, "days._id": dayId },
      {
        $push: {
          "days.$.times": {
            time: new Date(time),
            slots,
            available,
          },
        },
      },
      { new: true }
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

//Delete a Day
router.delete("/:monthId/day/:dayId", async (req, res) => {
  const { monthId, dayId } = req.params;

  try {
    const result = await ScheduleModel.findByIdAndUpdate(
      monthId,
      {
        $pull: {
          days: { _id: dayId },
        },
      },
      { new: true }
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Update a day
router.patch("/:monthId/day/:dayId", async (req, res) => {
  const { monthId, dayId } = req.params;
  const { day, description } = req.body;

  try {
    const result = await ScheduleModel.findOneAndUpdate(
      { _id: monthId, "days._id": dayId },
      {
        $set: {
          "days.$.day": new Date(day),
          "days.$.description": description,
        },
      },
      { new: true }
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Delete a Time
router.delete("/:monthId/day/:dayId/time/:timeId", async (req, res) => {
  const { monthId, dayId, timeId } = req.params;

  try {
    const result = await ScheduleModel.findOneAndUpdate(
      { _id: monthId, "days._id": dayId },
      {
        $pull: {
          "days.$.times": { _id: timeId },
        },
      },
      { new: true }
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.patch("/:monthId/day/:dayId/time/:timeId", async (req, res) => {
  const { monthId, dayId, timeId } = req.params;
  const { time, slots, available } = req.body;

  try {
    const result = await ScheduleModel.findOneAndUpdate(
      { _id: monthId, "days._id": dayId, "days.times._id": timeId },
      {
        $set: {
          "days.$.times.$[t].time": new Date(time),
          "days.$.times.$[t].slots": slots,
          "days.$.times.$[t].available": available,
        },
      },
      {
        arrayFilters: [{ "t._id": timeId }],
        new: true,
      }
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;
