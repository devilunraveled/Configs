local opt = vim.opt
local wo = vim.wo

-- Indenting
opt.expandtab = true
opt.shiftwidth = 4
opt.smartindent = true
opt.tabstop = 4

wo.relativenumber = true

-- Define key mappings
vim.api.nvim_set_keymap('n', '<leader>ll', ':LeetCodeList<CR>', { noremap = true, silent = true })
vim.api.nvim_set_keymap('n', '<leader>lt', ':LeetCodeTest<CR>', { noremap = true, silent = true })
vim.api.nvim_set_keymap('n', '<leader>ls', ':LeetCodeSubmit<CR>', { noremap = true, silent = true })
vim.api.nvim_set_keymap('n', '<leader>li', ':LeetCodeSignIn<CR>', { noremap = true, silent = true })


-- Key mapping for Jupynium.
vim.api.nvim_set_keymap('n', '<leader>rr', ':JupyniumExecuteSelectedCells<CR>', {desc = "Jupynium execute selected cells"} )
vim.api.nvim_set_keymap('n', '<leader>cl', ':JupyniumClearSelectedCellsOutputs<CR>', {desc = "Jupynium clear the output of selected cells"} )
-- vim.cmd('set python3_provider=1')
-- Adding Codeium to status line.
-- Define a function to set the statusline with Codeium status
