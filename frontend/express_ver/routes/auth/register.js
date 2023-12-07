const express = require('express')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const router = express.Router()
let path = '/api/v1/auth/admin/register'

router.post(path, (req, res) => {

})
module.exports = router