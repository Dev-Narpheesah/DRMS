// Resource Schema
const ResourceSchema = new mongoose.Schema({
    name: String,
    quantity: Number,
    location: String,
    allocatedToDisaster: { type: mongoose.Schema.Types.ObjectId, ref: 'Disaster' },
    allocatedAt: Date,
});

const Resource = mongoose.model('Resource', ResourceSchema);

// API to add a new resource
app.post('/api/resources', async (req, res) => {
    const resource = new Resource(req.body);
    await resource.save();
    res.send(resource);
});

// API to allocate resources to a disaster
app.post('/api/allocate-resource', async (req, res) => {
    const { resourceId, disasterId } = req.body;
    const resource = await Resource.findById(resourceId);
    resource.allocatedToDisaster = disasterId;
    resource.allocatedAt = new Date();
    await resource.save();
    res.send(resource);
});

// API to get all resources
app.get('/api/resources', async (req, res) => {
    const resources = await Resource.find().populate('allocatedToDisaster');
    res.send(resources);
});

// API to get resources allocated to a specific disaster
app.get('/api/resources/:disasterId', async (req, res) => {
    const resources = await Resource.find({ allocatedToDisaster: req.params.disasterId });
    res.send(resources);
});
