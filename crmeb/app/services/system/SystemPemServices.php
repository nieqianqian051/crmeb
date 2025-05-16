<?php

namespace app\services\system;

use app\dao\system\SystemPemDao;
use app\services\BaseServices;

class SystemPemServices extends BaseServices
{
    public function __construct(SystemPemDao $dao)
    {
        $this->dao = $dao;
    }

    public function savePem($data)
    {
        $this->dao->savePem($data);
        return true;
    }

    public function getPemPath($name)
    {
        $path = '';
        $info = $this->dao->get(['name' => $name]);
        if ($info) {
            $path = root_path('pem') . $info['path'] . '.pem';
            if (!file_exists($path)) {
                file_put_contents($path, $info['content']);
            }
        }
        return $path;
    }
}