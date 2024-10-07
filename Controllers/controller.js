const SimCard = require('../Model/Schema');
const activateSimCard = async (req, res) => {
    const { simNumber, phoneNumber } = req.body;
    if (!simNumber || !phoneNumber) {
        return res.status(400).json({ message: 'SIM number and phone number are required' });
    }

    try {
        const existingSimCard = await SimCard.findOne({ simNumber });
        if (existingSimCard) {
            if (existingSimCard.status === 'active') {
                return res.status(400).json({ message: 'SIM Card already active' });
            } else {
                existingSimCard.status = 'active';
                existingSimCard.activationDate = new Date();
                await existingSimCard.save();
                return res.json({ message: 'SIM Card activated', simCard: existingSimCard });
            }
        }

        const simCard = new SimCard({
            simNumber,
            phoneNumber,
            status: 'active',
            activationDate: new Date()
        });
        await simCard.save();

        res.json({ message: 'SIM Card activated', simCard });
    } catch (error) {
        console.error('Error activating SIM card:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

const deactivateSimCard = async (req, res) => {
    const { simNumber } = req.body;
    try {
        const simCard = await SimCard.findOne({ simNumber });
        if (!simCard) return res.status(404).json({ message: 'SIM Card not found' });
        if (simCard.status === 'inactive') return res.status(400).json({ message: 'SIM Card already inactive' });
        
        simCard.status = 'inactive';
        await simCard.save();
        
        res.json({ message: 'SIM Card deactivated', simCard });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getSimDetails = async (req, res) => {
    const { simNumber } = req.params;
    try {
        const simCard = await SimCard.findOne({ simNumber });
        if (!simCard) return res.status(404).json({ message: 'SIM Card not found' });
        
        res.json(simCard);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    activateSimCard,
    deactivateSimCard,
    getSimDetails
};