-- Change '<C-g>' here to any keycode you like.
vim.keymap.set('i', '<C-Right>', function () return vim.fn['codeium#Accept']() end, { expr = true })
vim.keymap.set('i', '<c-;>', function() return vim.fn['codeium#CycleCompletions'](1) end, { expr = true })
vim.keymap.set('i', '<c-,>', function() return vim.fn['codeium#CycleCompletions'](-1) end, { expr = true })
vim.keymap.set('i', '<c-x>', function() return vim.fn['codeium#Clear']() end, { expr = true })

vim.g.codeium_enabled = true
vim.g.codeium_idle_delay = 100
-- Changing default mappings.
